import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import sendError from '@fetcher/sendError';
import { IError } from '@src/interfaces/api';
import paraswapFetcher from '@fetcher/paraswap.fetcher';
import { IGasPricesResponse } from '@src/interfaces/paraswap';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IGasPricesResponse | IError>,
) {
    // TODO: add middleware to ckeck the body
    if (req.method === 'GET') {
        try {
            const { networkId: networkIdUrlParam } = req.query;
            const networkId = +networkIdUrlParam
                .toString()
                .replace(/[-,]/g, '.');

            if (Number.isNaN(+networkId)) {
                return res
                    .status(400)
                    .json({ errors: 'A networkId param must be provided' });
            }

            const gasPrices = await paraswapFetcher.getGasPrices(networkId);
            return res.status(200).json(gasPrices);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
