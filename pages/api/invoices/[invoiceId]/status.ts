import invoices from '@fetcher/request.fetcher';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import sendError from '@fetcher/sendError';
import { IError } from '@src/interfaces/api';

interface IInvoiceCancelResponse {
    id: string;
    requestId: string;
    actionType: string;
    input: { note: string };
    networkType: string;
    chainName: string;
    userId: string;
    timestamp: string;
    status: string;
}

const cancelInvoiceHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<
        IError | { message: string; invoice: IInvoiceCancelResponse }
    >,
) => {
    if (req.method === 'POST') {
        try {
            const invoice = await invoices.cancelOne(
                req.query.requestId as string,
            );

            if (invoice)
                return res
                    .status(200)
                    .json({ message: 'successfully cancelled', invoice });

            return res.status(404).json({ errors: 'Invoice not found' });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(405).json({ errors: 'Method not allowed' });
};
export default cancelInvoiceHandler;
