import { IBuyerInfos } from './request-network';
import { ICreateWooCommerceOrderLineItem } from './woocommerce-bodys';

export interface IError {
    errors: string | string[];
    message?: string;
}

export interface IPostOrderClientBody {
    buyerInfo: IBuyerInfos;
    lineItems: ILineItemClientBody[];
}

export interface IPostOrderBodyAfterMiddlleware {
    buyerInfo: IBuyerInfos;
    lineItems: ICreateWooCommerceOrderLineItem[];
}

export interface ILineItemClientBody {
    productId: number;
    variationId?: number;
    quantity: number;
}

export interface IPostOrderResponse {
    orderId: number;
    invoiceId: string;
}

export interface IValidatePaymentHandlerArgs {
    orderId: number;
    txHash: string;
}

export type IValidateOrderPaymentBody = Omit<
    IValidatePaymentHandlerArgs,
    'orderId'
>;

export interface IUpdatePaymentStatusResponse {
    orderId: number;
    status: string;
}

export interface IGetPaymentInfosResponse {
    orderId: number;
    invoiceId: string;
    paymentAddress: string;
    amount: number;
    paymentCurrency: {
        symbol: string;
        type: string;
        decimals: number;
        contractAddress: string;
        network: string;
    };
}
