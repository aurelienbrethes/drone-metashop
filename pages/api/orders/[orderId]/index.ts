import { orders } from '@fetcher/woocommerce.fetcher';
import type { NextApiRequest, NextApiResponse } from 'next';
import sendError from '@fetcher/sendError';
import patchMiddleware from '@middlewares/patch-order.middleware';
import axios from 'axios';
import { IError, IUpdatePaymentStatusResponse } from '@interfaces/api';
import invoices from '@fetcher/request.fetcher';
import { generateExplorerLink, getNetworkInfos } from '@utils/api/explorerLink';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUpdatePaymentStatusResponse | IError>,
) {
    const { orderId: orderIdUrlParam } = req.query;

    if (!orderIdUrlParam)
        return res.status(400).json({ errors: 'Order ID is required' });

    const orderId = +orderIdUrlParam;
    if (Number.isNaN(orderId)) {
        return res.status(400).json({ errors: 'Order ID should be a number' });
    }

    if (req.method === 'PATCH') {
        try {
            const { txHash } = patchMiddleware(req);
            const { status, invoice_id: invoiceId } = await orders.update(
                orderId,
                {
                    transaction_id: txHash,
                    status: 'on-hold',
                },
            );

            const [currency, network] =
                process.env.PAYMENT_CURRENCY?.split('-') || [];

            if (!currency || !network) {
                res.status(403);
                throw new Error(
                    "Sorry we can't retrieve the Payment Currency informations",
                );
            }

            let requestId = null;
            if (network !== 'rinkeby')
                requestId = (await invoices.postOnChain(invoiceId)).requestId;

            const paymentNetwork = getNetworkInfos(
                network === 'rinkeby' ? 'ropsten' : network,
            );
            if (!paymentNetwork) {
                res.status(403);
                throw new Error('Sorry, this network is not supported');
            }
            const explorerLink = generateExplorerLink(paymentNetwork, txHash);

            await orders.createNote(
                orderId,
                `Request N°:\n ${
                    requestId || invoiceId
                }\n ------------\n Explorer link:\n ${explorerLink}`,
            );

            return res.status(200).json({ orderId, status });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.json({ errors: (error as Error).message });
        }
    }

    return res.status(404).json({ errors: 'Method not allowed' });
}
