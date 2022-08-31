import { orders, settings } from '@fetcher/woocommerce.fetcher';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import sendError from '@fetcher/sendError';
import runEndpointMiddleware from '@src/middlewares/post-order.middleware';
import runCreateCustommerMiddleware from '@src/middlewares/post-customer.middleware';
import { IError, IPostOrderResponse } from '@interfaces/api';
import invoices from '@fetcher/request.fetcher';
import { transformLineItemsIntoInvoiceItems } from '@src/middlewares/post-invoice.middleware';
import invoiceBody from '@src/constants/request.constants';
import { invoiceNumberGenerator } from '@utils/invoices.utils';
import { invoiceCurrencies } from '@src/constants/currencies.contants';
import { AcceptedPaymentCurrenciesSymbols } from '@src/interfaces/currencies';
import convertWooAddressIntoRequestAddress from '@utils/api/convertAddress';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IPostOrderResponse | IError>,
) {
    if (req.method === 'POST') {
        try {
            const { lineItems, buyerInfo } = runEndpointMiddleware(req);
            const { billing, shipping } =
                runCreateCustommerMiddleware(buyerInfo);

            const { agreedTo, ...invoicingBuyerInfos } = buyerInfo;

            if (!agreedTo) {
                res.status(400);
                throw new Error(`Missing customer legal approval`);
            }

            // const {
            //     id: customerId,
            //     shipping,
            //     billing,
            // } = await customers.create(customerCreateBody);

            const { id: orderId, line_items: createdLineItems } =
                await orders.create({
                    line_items: lineItems,
                    // customer_id: customerId,
                    billing,
                    shipping,
                    payment_method: 'request_network',
                    payment_method_title: 'Request Network',
                    set_paid: false,
                });

            const paymentCurrencySymbol =
                process.env.PAYMENT_CURRENCY?.split('-')[0] || 'FAU';

            if (
                !Object.values(AcceptedPaymentCurrenciesSymbols).includes(
                    paymentCurrencySymbol as AcceptedPaymentCurrenciesSymbols,
                )
            ) {
                res.status(400);
                throw new Error(
                    `Invalid payment currency: ${paymentCurrencySymbol}`,
                );
            }

            const invoiceCurrency =
                invoiceCurrencies[
                    paymentCurrencySymbol as AcceptedPaymentCurrenciesSymbols
                ];

            const invoiceItems = transformLineItemsIntoInvoiceItems(
                createdLineItems,
                invoiceCurrency,
            );

            const storeAddressInfos = convertWooAddressIntoRequestAddress(
                await settings.getGroupOptions('general'),
            );

            const { id: invoiceId } = await invoices.create({
                buyerInfo: invoicingBuyerInfos,
                ...invoiceBody,
                sellerInfo: {
                    ...invoiceBody.sellerInfo,
                    address: storeAddressInfos,
                },
                invoiceItems,
                creationDate: new Date().toISOString(),
                invoiceNumber: invoiceNumberGenerator(
                    `${buyerInfo.lastName[0]} ${buyerInfo.firstName[0]}`,
                ),
            });

            await orders.createNote(orderId, `Invoice ID:\n${invoiceId}`); // 👈 Don't change this payload, it could be break the invoice_id key on a get one order woocommerce response

            return res.status(200).json({ orderId, invoiceId });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(400).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
