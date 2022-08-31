import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import axios from 'axios';

export const wooCommerceApi = new WooCommerceRestApi({
    url: process.env.WOOCOMMERCE_API_URL || 'http://localhost:8000',
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY || '',
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET || '',
    version: 'wc/v3',
});

export const defaultOptions: Partial<ClientParams> = {
    per_page: 100,
};

export const wordpressApi = axios.create({
    baseURL: `${
        process.env.WOOCOMMERCE_API_URL || 'http://localhost:8000'
    }/wp-json/wp/v2`,
});

/**
 * @description Get the variants of a given product id. Raw data directly from WooCommerceApi.
 * @param productId as number
 * @returns array of IVariationWithAdditionnalImages
 */
export const getOriginalVariants = async (
    productId: number,
): Promise<IVariationWithAdditionnalImages[]> =>
    (
        await wooCommerceApi.get(`products/${productId}/variations`, {
            ...defaultOptions,
        })
    ).data;
