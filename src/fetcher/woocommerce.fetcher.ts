/* eslint-disable import/no-extraneous-dependencies */
import {
    CreateWooCommerceCustomerBody,
    ICreateWooCommerceOrderBody,
    IUpdateWooCommerceOrderBody,
} from '@src/interfaces/woocommerce-bodys';
import {
    getIMetaShopProduct,
    getIMetaShopVariant,
    getIMetaShopVariants,
} from '@utils/shop.utils';
import { WP_REST_API_Attachment } from 'wp-types';
import {
    defaultOptions,
    getOriginalVariants,
    wooCommerceApi,
    wordpressApi,
} from './utils/woocommerce.utils';

export const products = {
    getAll: async (
        options?: Partial<ClientParams>,
    ): Promise<IMetaShopProduct[]> => {
        const productsData: IProductWithCustomOptions[] = (
            await wooCommerceApi.get('products', {
                ...defaultOptions,
                ...options,
            } as Partial<ClientParams>)
        ).data;
        return productsData.map((product) => getIMetaShopProduct(product));
    },

    getOne: async (productId: number): Promise<IMetaShopProduct> =>
        getIMetaShopProduct(
            (
                await wooCommerceApi.get(`products/${productId}`, {
                    ...defaultOptions,
                } as Partial<ClientParams>)
            ).data,
        ),

    getFirstBySlug: async (
        slug: string,
        options?: Partial<ClientParams>,
    ): Promise<IMetaShopProduct | undefined> => {
        const [first] = (
            await wooCommerceApi.get(`products?slug=${slug}`, {
                ...defaultOptions,
                ...options,
            })
        ).data;
        if (!first) return undefined;
        return getIMetaShopProduct(first);
    },

    getVariations: async (productId: number): Promise<IMetaShopVariant[]> =>
        getIMetaShopVariants(await getOriginalVariants(productId)),

    getOneVariantByAttributes: async (
        productId: number,
        selectedAttributes: string[],
    ): Promise<IMetaShopVariant | undefined> => {
        const variant = (await getOriginalVariants(productId)).find(
            (variation) =>
                variation.attributes.every((varAtt) =>
                    selectedAttributes.some(
                        (selected) =>
                            selected.toLowerCase() ===
                            varAtt.option.toLowerCase(),
                    ),
                ),
        );
        if (!variant) return undefined;
        return getIMetaShopVariant(variant);
    },

    getCategories: async (): Promise<ICategory[]> =>
        (
            await wooCommerceApi.get('products/categories', {
                ...defaultOptions,
            })
        ).data,
};

export const medias = {
    getOne: async (postId: number): Promise<WP_REST_API_Attachment> =>
        (await wordpressApi.get(`media/${postId}`)).data,
};

export const variations = {
    getOne: async (
        productId: number,
        variationId: number,
    ): Promise<IMetaShopVariant> =>
        (
            await wooCommerceApi.get(
                `products/${productId}/variations/${variationId}`,
                {
                    ...defaultOptions,
                },
            )
        ).data,
};

export const attributes = {
    getAll: async (): Promise<IAttributeResponse[]> =>
        (
            await wooCommerceApi.get('products/attributes', {
                ...defaultOptions,
            })
        ).data,

    getOne: async (attributeId: number): Promise<IAttributeResponse> =>
        (
            await wooCommerceApi.get(`products/attributes/${attributeId}`, {
                ...defaultOptions,
            })
        ).data,
};

export const customers = {
    create: async (
        customerBoby: CreateWooCommerceCustomerBody,
    ): Promise<ICustomer> =>
        (await wooCommerceApi.post('customers', customerBoby)).data,
};

export const orders = {
    getOne: async (orderId: number): Promise<IOrder> =>
        (await wooCommerceApi.get(`orders/${orderId}`)).data,

    create: async (orderBoby: ICreateWooCommerceOrderBody): Promise<IOrder> =>
        (await wooCommerceApi.post('orders', orderBoby)).data,

    update: async (
        orderId: number,
        body: IUpdateWooCommerceOrderBody,
    ): Promise<IOrder> =>
        (await wooCommerceApi.put(`orders/${orderId}`, body)).data,

    cancel: async (orderId: number): Promise<IOrder> =>
        (
            await wooCommerceApi.put(`orders/${orderId}`, {
                status: 'cancelled',
            })
        ).data,

    createNote: async (orderId: number, note: string): Promise<INote> =>
        (await wooCommerceApi.post(`orders/${orderId}/notes`, { note })).data,
};

export const countries = {
    getAll: async (): Promise<ICountry[]> =>
        (await wooCommerceApi.get('data/countries')).data,

    getOne: async (countryCode: string): Promise<ICountry> =>
        (await wooCommerceApi.get(`data/countries/${countryCode}`)).data,
};

export const settings = {
    getAll: async (): Promise<ISetting[]> =>
        (await wooCommerceApi.get('settings')).data,

    getGroupOptions: async (settingId: string): Promise<ISettingOption[]> =>
        (await wooCommerceApi.get(`settings/${settingId}`)).data,

    getOneOption: async (
        settingId: string,
        optionId: string,
    ): Promise<ISettingOption> =>
        (await wooCommerceApi.get(`settings/${settingId}/${optionId}`)).data,
};
