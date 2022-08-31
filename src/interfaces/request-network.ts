/* eslint-disable import/no-extraneous-dependencies */
import { IRequestData } from '@requestnetwork/types/dist/client-types';
import { FormAddress } from './form';

export interface IBuyerInfos {
    address: IInvoiceAddress;
    email: string;
    firstName: string;
    lastName: string;
    agreedTo?: boolean; // mandatory when creating order but optional when fetching invoices (not defined on invoices)
}

export interface ISellerInfos extends Omit<IBuyerInfos, 'agreedTo'> {
    businessName: string;
    taxRegistration: string;
}

export interface InvoiceItem {
    currency: string;
    name: string;
    quantity: number;
    tax: {
        type: 'percentage' | 'fixed';
        amount: string;
    };
    unitPrice: string;
}

export interface IInvoiceBody {
    meta: {
        format: string;
        version: string;
    };
    draft?: boolean;
    creationDate: string;
    invoiceItems: InvoiceItem[];
    invoiceNumber: string;
    buyerInfo: Omit<IBuyerInfos, 'agreedTo'>;
    sellerInfo: ISellerInfos;
    paymentTerms?: {
        dueDate: string;
    };
    paymentAddress?: string;
    paymentCurrency: string;
    tags?: string[];
}

export interface IUsdPaymentMetadata {
    paymentFrom: string;
    paymentDate: string;
    gasFeeUsd: string;
    paidAmount: string;
    paidAmountCrypto: string;
    paidAmountUsd: string;
    gasFee: string;
    gasFeeCurrency: string;
    requestFee: string;
    requestFeeCurrency: string;
    requestFeeUsd: string;
    txHash: string;
    chainName: string;
    paymentCurrency: string;
}

export interface IInvoiceCreateResponse extends IInvoiceBody {
    id: string;
    type: string;
    requestId: string;
    status: string;
    paymentMetadata: IUsdPaymentMetadata | null;
    role: string;
}

export interface IConvertInvoiceOnChain {
    requestId: string;
}

export type InvoiceGetResponse = IInvoiceCreateResponse;

export type IInvoiceGetOneResponse = IInvoiceCreateResponse;

// Other unused keys are avaible in first level of request
export interface IInvoiceGetOneResponseWithRequest
    extends IInvoiceGetOneResponse {
    request?: {
        request: IRequestData;
    };
}

export interface IInvoiceAddress extends Omit<FormAddress, 'state'> {
    extendedAddress?: string;
    region?: string;
}
