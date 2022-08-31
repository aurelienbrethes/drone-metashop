import invoices from '@fetcher/request.fetcher';
import type { NextApiRequest, NextApiResponse } from 'next';
import sendError from '@fetcher/sendError';
import axios from 'axios';
import { IInvoiceGetOneResponseWithRequest } from '@interfaces/request-network';
import { IError } from '@interfaces/api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IInvoiceGetOneResponseWithRequest | IError>,
) {
    const { invoiceId } = req.query;

    if (!invoiceId)
        return res.status(400).json({ errors: 'Invoice ID is required' });

    if (req.method === 'GET') {
        try {
            const invoiceresponse = await invoices.getOne(invoiceId.toString());
            return res.status(200).json(invoiceresponse);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }

    return res.status(404).json({ errors: 'Method not allowed' });
}
