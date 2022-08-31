/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import NProgress from 'nprogress';
import router from 'next/router';
import { QueryClientProvider, Hydrate } from 'react-query';
import queryClients from 'src/fetcher/query_client/';
import { ReactQueryDevtools } from 'react-query/devtools';
import '@fontsource/inter';
import '@fontsource/syncopate';
import '@fontsource/poppins';
import { MetaMaskProvider } from 'metamask-react';
import store from 'src/redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '@components/Error/ErrorBoundary';
import ErrorFallback from '@components/Error/ErrorFallback';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultSeo } from 'next-seo';
import getMetaShopInfos from '@fetcher/wordpress.fetcher';
import Layout from '../src/components/Layout';
import '../i18n';

NProgress.configure({ showSpinner: false });
router.events.on('routeChangeStart', () => NProgress.start());
router.events.on('routeChangeComplete', () => NProgress.done());
router.events.on('routeChangeError', () => NProgress.done());

function MyApp({
    Component,
    pageProps,
    siteInfos,
}: AppProps & { siteInfos: ISiteInfos }) {
    return (
        <>
            <DefaultSeo
                title={siteInfos.siteName}
                description={siteInfos.siteDescription}
                additionalLinkTags={[
                    {
                        rel: 'icon',
                        href: siteInfos.siteIconUrl,
                    },
                ]}
                openGraph={{
                    type: 'website',
                    site_name: siteInfos.siteName,
                    description: siteInfos.siteDescription,
                    images: [
                        {
                            url: siteInfos.siteLogoUrl,
                            width: 500,
                            height: 500,
                            alt: `${siteInfos.siteName} logo`,
                        },
                    ],
                }}
            />
            <ReduxProvider store={store}>
                <MetaMaskProvider>
                    <QueryClientProvider client={queryClients}>
                        <Hydrate state={pageProps.dehydratedState}>
                            <Layout siteInfos={siteInfos}>
                                <ErrorBoundary ErrorFallback={ErrorFallback}>
                                    <Component
                                        {...pageProps}
                                        siteInfos={siteInfos}
                                    />
                                </ErrorBoundary>
                                <ToastContainer autoClose={3000} />
                            </Layout>
                        </Hydrate>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </MetaMaskProvider>
            </ReduxProvider>
        </>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const siteInfos = await getMetaShopInfos();
    return { ...appProps, siteInfos };
};

export default MyApp;
