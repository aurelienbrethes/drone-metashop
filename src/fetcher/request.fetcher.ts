import {
    IConvertInvoiceOnChain,
    IInvoiceBody,
    IInvoiceCreateResponse,
    InvoiceGetResponse,
    IInvoiceGetOneResponseWithRequest,
} from '@interfaces/request-network';
import requestUtils from '@fetcher/request';

const { requestApi } = requestUtils;

const invoices = {
    getOne: async (
        invoiceId: string,
    ): Promise<IInvoiceGetOneResponseWithRequest> =>
        (await requestApi.get(`/invoices/${invoiceId}?withRequest=true`)).data,

    cancelOne: async (invoiceId: string) =>
        (
            await requestApi.post(`/invoices/${invoiceId}/changes`, {
                type: 'cancel',
                input: { note: 'Test void endpoint' },
            })
        ).data,

    getAll: async (): Promise<InvoiceGetResponse[]> =>
        (await requestApi.get('/invoices')).data,

    create: async (body: IInvoiceBody): Promise<IInvoiceCreateResponse> =>
        (await requestApi.post('/invoices', body)).data,
    postOnChain: async (invoiceId: string): Promise<IConvertInvoiceOnChain> =>
        (await requestApi.post(`/invoices/${invoiceId}`)).data,
};

export default invoices;
