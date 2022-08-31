/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import useCartFromStore from '@hooks/useCartFromStore';
import AddToCart from '@components/Products/ProductOverview/AddToCart';
import ProductImages from '@components/Products/ProductOverview/ProductImages';
import ProductInfos from '@components/Products/ProductOverview/ProductInfos';
import { products } from 'src/fetcher/woocommerce.fetcher';
import { products as clientProductsFetcher } from 'src/fetcher/next-api.fetcher';
import usePrices from '@hooks/usePrices';
import useToggleCheckout from '@hooks/useToggleCheckout';
import {
    generateCartItemPayload,
    generatePlaceHolderUrl,
} from '@utils/shop.utils';
import getProductQuantities from '@fetcher/utils/getProductQuantities';
import useVariations from '@src/hooks/useVariants';
import OptionsPicker from '@components/Products/ProductOverview/OptionsPicker';
import {
    refreshProductQuantity,
    refreshVariantQuantity,
} from '@utils/quantities.utils';
import CustomToast from '@components/Toats/CustomToast';

interface IProps {
    product: IMetaShopProduct;
    variants: IMetaShopVariant[] | null;
    siteInfos?: ISiteInfos;
}

const ProductOverviewPage: NextPage<IProps> = ({
    product,
    variants,
    siteInfos,
}: IProps) => {
    let currentUrl = '';

    useEffect(() => {
        currentUrl = document.location.href;
    }, []);
    useToggleCheckout(false);
    const router = useRouter();
    const { slug } = router.query;

    const { data: productQuantities } = useQuery(
        ['products', `${slug}`, 'quantities'],
        () => clientProductsFetcher.getQuantities(product.id),
    );

    const { currentVariant, onChangeVariant, selectedOptions } = useVariations(
        variants || [],
        product.customOptions?.length || 0,
    );

    const taxRate = currentVariant?.taxClass || product.taxClass;

    const { displayedPrice } = usePrices(
        currentVariant?.price || product.price,
        taxRate,
    );

    const { triggerDispatchAddItem, isPurchasable } = useCartFromStore();

    const addToCart = async () => {
        try {
            if (!productQuantities) return;
            const stockQuantity =
                typeof currentVariant?.stockQuantity === 'number' &&
                productQuantities?.variantsQuantities
                    ? refreshVariantQuantity(
                          currentVariant,
                          productQuantities.variantsQuantities,
                      ).stockQuantity
                    : refreshProductQuantity(
                          product,
                          productQuantities?.quantity,
                      ).stockQuantity;

            triggerDispatchAddItem(
                generateCartItemPayload({
                    variant: currentVariant,
                    product,
                    price: currentVariant?.price || product.price,
                    manage_stock:
                        !!currentVariant?.managedStock || product.managedStock,
                    taxRate,
                    stockQuantity,
                    options: selectedOptions,
                }),
            );
        } catch (e) {
            toast.error(<CustomToast message={(e as Error).message} />);
        }
    };

    const placeholderUrl = generatePlaceHolderUrl(currentVariant || product);

    if (!productQuantities) return <p>loading..</p>;

    const htmlParser = /(<([^>]+)>)/gi;

    return (
        <>
            <NextSeo
                title={product.name.replace(htmlParser, '')}
                description={product.description.replace(htmlParser, '')}
                canonical={product.slug}
                openGraph={{
                    url: currentUrl,
                    title: product.name.replace(htmlParser, ''),
                    description: product.description
                        .replace(htmlParser, '')
                        .slice(1, 150),
                    images: [
                        {
                            url: product.images[0].src,
                            width: 500,
                            height: 500,
                            alt: `${siteInfos?.siteName} logo`,
                        },
                    ],
                    site_name: siteInfos?.siteName,
                }}
            />
            <div className="w-full px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start">
                    <ProductImages
                        images={currentVariant?.images || product.images}
                        placeholder={placeholderUrl}
                    />
                    <div className="mt-10 sm:mt-16 lg:mt-0">
                        <ProductInfos
                            shortDescription={product.shortDescription}
                            name={product.name}
                            price={displayedPrice}
                            quantityInStock={
                                productQuantities.variantsQuantities?.find(
                                    (v) => currentVariant?.id === v.id,
                                )?.quantity ||
                                productQuantities?.quantity ||
                                0
                            }
                            managedStock={
                                !!currentVariant?.managedStock ||
                                product.managedStock
                            }
                        />
                        {product.customOptions && (
                            <>
                                <OptionsPicker
                                    productOptions={product.customOptions}
                                    handleChange={onChangeVariant}
                                    selectedOptions={selectedOptions}
                                />
                            </>
                        )}

                        <AddToCart
                            isLoading={false}
                            handleClick={addToCart}
                            disabled={
                                !product.purchasable ||
                                !isPurchasable({
                                    isVariant: !!currentVariant,
                                    item:
                                        currentVariant &&
                                        productQuantities.variantsQuantities
                                            ? refreshVariantQuantity(
                                                  currentVariant,
                                                  productQuantities.variantsQuantities,
                                              )
                                            : refreshProductQuantity(
                                                  product,
                                                  productQuantities.quantity,
                                              ),
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await products.getAll({ status: 'publish' })).map(
        ({ slug, categories }) => ({
            params: {
                slug,
                category: categories[0].slug,
            },
        }),
    );

    return { paths: paths.flat(), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
    const { slug } = context.params as {
        slug: string;
        categories: string;
    };

    const product = await products.getFirstBySlug(slug as string, {
        status: 'publish',
    });
    if (!product) {
        return { notFound: true };
    }

    let variants: IMetaShopVariant[] | null = null;
    if (product.type === 'variable') {
        variants = await products.getVariations(product.id);
    }

    const productQuantities = getProductQuantities(product, variants);

    const queryClient = new QueryClient();
    queryClient.setQueryData(
        ['products', `${slug}`, 'quantities'],
        productQuantities,
    );

    return {
        props: {
            product,
            variants,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 10,
    };
};

export default ProductOverviewPage;
