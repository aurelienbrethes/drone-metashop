import { useEffect } from 'react';
import type { InferGetStaticPropsType, NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import useAppState from '@hooks/useAppState';
import { products as productFetcher } from '@fetcher/woocommerce.fetcher';
import useToggleCheckout from '@hooks/useToggleCheckout';

import FirstSection from '@components/Drone/FirstSection';
import SecondSection from '@components/Drone/SecondSection';
import ThirdSection from '@components/Drone/ThirdSection';
import FourthSection from '@components/Drone/FourthSection';
import FifthSection from '@components/Drone/FifthSection';
import NavBar from '@components/Layout/NavBar';
import Footer from '@components/Layout/Footer';

interface IProps {
    products: IMetaShopProduct[];
    siteInfos?: ISiteInfos;
}

const Home: NextPage<IProps> = ({
    products,
    siteInfos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { dispatchCartProducts } = useAppState();

    useToggleCheckout(false);

    useEffect(() => {
        dispatchCartProducts(products);
    }, [products, dispatchCartProducts]);

    return (
        <>
            {siteInfos && (
                <NextSeo
                    title={siteInfos.siteName}
                    description={siteInfos.siteDescription}
                    canonical={siteInfos.siteUrl}
                    openGraph={{
                        url: siteInfos.siteUrl,
                        title: siteInfos.siteName,
                        description: siteInfos.siteDescription,
                        images: [
                            {
                                url: siteInfos.siteLogoUrl,
                            },
                        ],
                        site_name: siteInfos.siteName,
                    }}
                />
            )}
            <NavBar />
            <div className="lg:mt-28 sm:mt-20">
                <FirstSection />
                <SecondSection />
                <ThirdSection />
                <FourthSection />
                <FifthSection />
            </div>
            <Footer />
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

export default Home;
