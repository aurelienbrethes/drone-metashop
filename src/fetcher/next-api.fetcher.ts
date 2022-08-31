import {
    IGetPaymentInfosResponse,
    IPostOrderClientBody,
    IPostOrderResponse,
    IUpdatePaymentStatusResponse,
    IValidatePaymentHandlerArgs,
} from '@interfaces/api';
import { IInvoiceGetOneResponseWithRequest } from '@interfaces/request-network';
import {
    GasPricesResponse,
    SwapTransactionArgs,
    SwapTransactionResponse,
    TokenRateBody,
    TokenRateResponse,
} from '@src/interfaces/swap-payment';
import axios from 'axios';

export const axiosInstance = axios.create({
    timeout: process.env.NEXT_PUBLIC_REQUEST_TIMEOUT
        ? +process.env.NEXT_PUBLIC_REQUEST_TIMEOUT
        : 10000,
    withCredentials: true,
});

/**
 * @description Object that contains all the client side invoice's fetchers
 * @method getOne - Get one invoice
 * @method cancelOne - Cancel an invoice
 */
export const invoices = {
    getOne: async (
        invoiceId: string,
    ): Promise<IInvoiceGetOneResponseWithRequest> =>
        (await axiosInstance.get(`api/invoices/${invoiceId}`)).data,

    cancelOne: async (requestId: string) =>
        (await axiosInstance.post(`/api/invoices/${requestId}/status`)).data,
};

/**
 * @description Object that contains all the client side product's fetchers
 * @method getOneProductInfos - Get infos about a product for a given slug
 * @method getQuantities - Get the quantities infos for a given product id
 */
export const products = {
    getOneProductInfos: async (
        slug: string,
    ): Promise<IMetaShopProduct | undefined> =>
        (await axiosInstance.get(`/api/products?slug=${slug}`)).data,

    getQuantities: async (id: number): Promise<IProductQuantities> =>
        (await axiosInstance.get(`/api/products/${id}/quantities`)).data,
};

/**
 * @description Object that contains all the client side variant's fetchers
 * @method getOneByProductAttributes - Get datas about a variant for a given product id and attributes
 */
export const variants = {
    getOneByProductAttributes: async (
        productId: number,
        selectedAttributes: string[],
    ): Promise<IMetaShopVariant | null> =>
        (
            await axiosInstance.get(
                `/api/products/${productId}/variations?attributes=${selectedAttributes.join(
                    ',',
                )}`,
            )
        ).data,
};

/**
 * @description Object that contains all the client side orders fetchers
 * @method create - Create a new order
 * @method validatePayment - Set the payment status of an order to paid
 * @method cancel - Abort an order
 * @method getPaymentInfos - Get the payment infos of an order (use in payment page)
 */
export const orders = {
    create: async (body: IPostOrderClientBody): Promise<IPostOrderResponse> =>
        (await axiosInstance.post('/api/orders', body)).data,

    validatePayment: async ({
        orderId,
        txHash,
    }: IValidatePaymentHandlerArgs): Promise<IUpdatePaymentStatusResponse> =>
        (
            await axiosInstance.patch(`/api/orders/${orderId}`, {
                txHash,
            })
        ).data,

    cancel: async (orderId: number): Promise<IOrder> =>
        (await axiosInstance.put(`/api/orders/${orderId}/cancel`)).data,

    getPaymentInfos: async (
        orderId: number,
    ): Promise<IGetPaymentInfosResponse> =>
        (await axiosInstance.get(`/api/orders/${orderId}/payment-infos`)).data,
};

export const swapFetcher = {
    findTokenRate: async (body: TokenRateBody): Promise<TokenRateResponse> =>
        (
            await axiosInstance.post(`/api/swap/find-token-rate`, {
                ...body,
            })
        ).data,

    swapPayment: async (
        body: SwapTransactionArgs,
    ): Promise<SwapTransactionResponse> =>
        (await axiosInstance.post(`/api/swap/swap-payment`, body)).data,

    getGasPrices: async (networId: number): Promise<GasPricesResponse> =>
        (await axiosInstance.get(`/api/swap/gas-prices?networkId=${networId}`))
            .data,
};

export const countries = {
    getAll: async (): Promise<ICountry[]> =>
        (await axiosInstance.get('/api/countries')).data,

    getOne: async (countryCode: string): Promise<ICountry> =>
        (await axiosInstance.get(`/api/countries/${countryCode}`)).data,
};
