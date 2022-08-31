import { IError } from '@src/interfaces/api';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import sendError from '@fetcher/sendError';
import { products } from '@src/fetcher/woocommerce.fetcher';
import getProductQuantities from '@fetcher/utils/getProductQuantities';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IProductQuantities | IError>,
) {
    const { productId } = req.query;
    if (!productId || typeof +productId !== 'number')
        return res.status(400).json({
            errors: 'productId parameter is required and must be a number',
        });

    if (req.method === 'GET') {
        try {
            const product = await products.getOne(+productId);
            let variants = null;
            if (product.type === 'variable') {
                variants = await products.getVariations(+productId);
            }
            const response = getProductQuantities(product, variants);
            return res.status(200).json(response);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
