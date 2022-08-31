import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import sendError from '@fetcher/sendError';
import { IError } from '@src/interfaces/api';
import { countries } from '@fetcher/woocommerce.fetcher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICountry[] | IError>,
) {
    // TODO: add middleware to ckeck the body
    if (req.method === 'GET') {
        try {
            const countriesList = await countries.getAll();
            return res.status(200).json(countriesList);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
