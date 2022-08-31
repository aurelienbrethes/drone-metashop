import ProductGrid from '@components/Products/ProductGrid';
import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import Title from '@components/UI/Title';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { products as productFetcher } from '@fetcher/woocommerce.fetcher';
import useToggleCheckout from '@hooks/useToggleCheckout';
import useAppState from '@src/hooks/useAppState';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'react-i18next';

interface IProps {
    products: IMetaShopProduct[];
    siteInfos?: ISiteInfos;
}

const Shop: NextPage<IProps> = ({
    products,
    siteInfos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    useToggleCheckout(false);
    const { siteName, siteDescription } = useAppState();
    const { t } = useTranslation();

    return (
        <>
            {siteInfos && (
                <NextSeo
                    title={siteInfos.siteName}
                    description={siteInfos.siteDescription}
                    canonical={`${siteInfos.siteUrl}/shop`}
                    openGraph={{
                        url: `${siteInfos.siteUrl}/shop`,
                        title: siteInfos.siteName,
                        description: siteInfos.siteDescription,
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
                className="w-full min-h-screen max-w-7xl"
            >
                <FlexContainer
                    justify="justify-start"
                    direction="flex-col"
                    className="w-full min-h-screen max-w-7xl"
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
        </>
    );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
    const products = await productFetcher.getAll({ status: 'publish' });

    return {
        props: {
            products,
        },
        revalidate: 10,
    };
};

export default Shop;
