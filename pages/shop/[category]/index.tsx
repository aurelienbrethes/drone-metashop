import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '@components/Products/ProductGrid';
import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import Title from '@components/UI/Title';
import type {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPropsResult,
    InferGetStaticPropsType,
    NextPage,
} from 'next';
import { products as productFetcher } from '@fetcher/woocommerce.fetcher';
import useToggleCheckout from '@hooks/useToggleCheckout';
import useAppState from '@src/hooks/useAppState';
import { ParsedUrlQuery } from 'querystring';

interface IProps {
    products: IMetaShopProduct[];
    categories: ICategory[];
    currentCategoryId: number;
    siteInfos?: ISiteInfos;
}

const Category: NextPage<IProps> = ({
    products,
    categories,
    currentCategoryId,
    siteInfos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    useToggleCheckout(false);
    const { t } = useTranslation();
    const { siteName, siteDescription } = useAppState();

    let currentUrl = '';

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        currentUrl = document.location.href;
    }, [categories]);

    const [currentCategory] = categories.filter(
        (category) => category.id === currentCategoryId,
    );

    return (
        <>
            {currentCategory && siteInfos && (
                <NextSeo
                    title={currentCategory.name}
                    description={currentCategory.description}
                    canonical={currentCategory.slug}
                    openGraph={{
                        url: currentUrl,
                        title: currentCategory.name,
                        description: currentCategory.description,
                        images: [
                            {
                                url: siteInfos.siteLogoUrl,
                                width: 500,
                                height: 500,
                                alt: `${siteInfos.siteName} logo`,
                            },
                        ],
                        site_name: siteInfos.siteName,
                    }}
                />
            )}
            <FlexContainer
                justify="justify-start"
                direction="flex-col"
                className="w-full min-h-screen max-w-7xl "
            >
                <FlexContainer
                    justify="justify-around"
                    direction="flex-col"
                    className="h-24 my-5 md:my-10 md:h-48"
                >
                    <Title text={siteName} />
                    <Text
                        text={siteDescription}
                        className="font-semibold text-center text-gray-500"
                    />
                </FlexContainer>
                {products.length ? (
                    <ProductGrid products={products} />
                ) : (
                    <Text
                        text={t('home.noProducts')}
                        className="font-semibold text-center text-gray-700"
                    />
                )}
            </FlexContainer>
            {products.length ? (
                <ProductGrid products={products} />
            ) : (
                <Text
                    text={t('home.noProducts')}
                    className="font-semibold text-center text-gray-700"
                />
            )}
        </>
    );
};

interface IParams extends ParsedUrlQuery {
    category: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (await productFetcher.getCategories()).map((category) => ({
        params: {
            category: category.slug,
        },
    }));
    return { paths: paths.flat(), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<IProps> = async (
    context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps>> => {
    const { category: categorySlug = '' } = context.params as IParams;

    const currentCategoryId = (await productFetcher.getCategories()).find(
        (category) =>
            category.slug.toLowerCase() === categorySlug.toLowerCase(),
    )?.id;

    if (!currentCategoryId) return { notFound: true };

    const categories = await productFetcher.getCategories();

    const products = await productFetcher.getAll({
        category: `${currentCategoryId}`,
    });

    return {
        props: {
            products,
            categories,
            currentCategoryId,
        },
        revalidate: 10,
    };
};

export default Category;
