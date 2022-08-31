import { orders } from '@fetcher/woocommerce.fetcher';
import type { NextApiRequest, NextApiResponse } from 'next';
import sendError from '@fetcher/sendError';
import axios from 'axios';
import { IError, IGetPaymentInfosResponse } from '@interfaces/api';
import invoices from '@fetcher/request.fetcher';
import { currencies } from 'request-fiat-to-erc20-payment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGetPaymentInfosResponse | IError>,
) {
    const { orderId: orderIdUrlParam } = req.query;

    if (!orderIdUrlParam)
        return res.status(400).json({ errors: 'Order ID is required' });

    const orderId = +orderIdUrlParam.toString().replace(/[-,]/g, '.');
    if (Number.isNaN(orderId))
        return res.status(400).json({ errors: 'Order ID should be a number' });

    if (req.method === 'GET') {
        try {
            const {
                total,
                status: orderStatus,
                invoice_id: invoiceId,
            } = await orders.getOne(orderId);

            if (orderStatus === 'processing' || orderStatus === 'completed') {
                res.status(403);
                throw new Error('Order is already payed');
            }

            const {
                paymentCurrency,
                paymentAddress,
                status: invoiceSatus,
            } = await invoices.getOne(invoiceId);

            if (invoiceSatus === 'paid' || invoiceSatus === 'canceled') {
                res.status(403);
                throw new Error('Invoice not awaiting payment');
            }

            if (!paymentAddress) {
                res.status(403);
                throw new Error('Sorry, paymentAddress is not provided');
            }

            const {
                decimals,
                symbol,
                type,
                network,
                hash: contractAddress,
            } = await currencies.getOne(paymentCurrency);

            const amount = +total * 10 ** decimals;

            const response = {
                orderId,
                invoiceId,
                amount,
                paymentAddress,
                paymentCurrency: {
                    symbol,
                    type,
                    decimals,
                    contractAddress,
                    network,
                },
            };
            return res.status(200).json(response);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.json({ errors: (error as Error).message });
        }
    }

    return res.status(404).json({ errors: 'Method not allowed' });
}
