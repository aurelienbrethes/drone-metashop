import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { WP_REST_API_Post } from 'wp-types';

const getMetaShopInfos = async (): Promise<ISiteInfos> => {
    const metasInfosUrl = `${process.env.WOOCOMMERCE_API_URL}/wp-json/wc/v3/metashop-infos`;

    const {
        shop_name: siteName,
        shop_description: siteDescription,
        shop_logo: siteLogoUrl,
        shop_icon: siteIconUrl,
        shop_notice: shopNotice,
        shop_url: siteUrl,
    } = (await axios.get<unknown, AxiosResponse<IMetaShopInfos>>(metasInfosUrl))
        .data;

    const siteInfos = {
        siteName,
        siteDescription,
        siteLogoUrl: siteLogoUrl || 'images/logo.png',
        siteIconUrl: siteIconUrl || 'images/logo.png',
        shopNotice,
        siteUrl,
    };

    return siteInfos;
};

export default getMetaShopInfos;

export const wpPages = {
    getOne: async (slug: string): Promise<WP_REST_API_Post | undefined> => {
        const [pageContent] = await (
            await axios.get(
                `${process.env.WOOCOMMERCE_API_URL}/wp-json/wp/v2/pages?slug=${slug}`,
            )
        ).data;
        return pageContent;
    },
};
