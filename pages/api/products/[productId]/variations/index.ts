import { IError } from '@src/interfaces/api';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import sendError from '@fetcher/sendError';
import { products } from '@src/fetcher/woocommerce.fetcher';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IMetaShopVariant[] | IMetaShopVariant | IError | null>,
) {
    const { productId } = req.query;
    if (!productId)
        return res
            .status(400)
            .json({ errors: 'ProductId parameter is required' });

    if (req.method === 'GET') {
        try {
            const { attributes } = req.query;

            if (attributes) {
                const variationFilteredByAttributes =
                    await products.getOneVariantByAttributes(
                        +productId,
                        (attributes as string).split(','),
                    );
                return res
                    .status(200)
                    .json(variationFilteredByAttributes || null);
            }
            const variations = await products.getVariations(+productId);
            return res.status(200).json(variations);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
