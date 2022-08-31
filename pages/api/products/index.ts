import { IError } from '@src/interfaces/api';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import sendError from '@fetcher/sendError';
import { products } from '@src/fetcher/woocommerce.fetcher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IMetaShopProduct | IError | null>,
) {
    const { slug } = req.query;
    if (!slug || typeof slug !== 'string')
        return res.status(400).json({ errors: 'slug parameter is required' });

    if (req.method === 'GET') {
        try {
            const productInfos = await products.getFirstBySlug(slug);
            return res.status(200).json(productInfos || null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
