import paraswapFetcher from '@fetcher/paraswap.fetcher';
import sendError from '@fetcher/sendError';
import { IError } from '@src/interfaces/api';
import {
    SwapTransactionArgs,
    SwapTransactionResponse,
} from '@src/interfaces/swap-payment';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { swapPartnerDetails } from '@constants/swap.partner.constants';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SwapTransactionResponse | IError>,
) {
    // TODO: add middleware to ckeck body
    if (req.method === 'POST') {
        try {
            const { networkId, mode, srcAmount, slippage, gasPrice, ...rest } =
                req.body as SwapTransactionArgs;

            const body =
                mode === 'transfer'
                    ? {
                          ...rest,
                          // Force slippage to 2% for the moment. Later user can change it. If slippage is provided, srcAmount can't be sent
                          slippage: 200,
                          receiver: process.env.PAYMENT_WALLET_ADDRESS,
                          partner: swapPartnerDetails.partnerName,
                          partnerAddress: swapPartnerDetails.partnerAddress,
                          partnerFeeBps:
                              swapPartnerDetails.partnerFeePercentage,
                      }
                    : { ...rest, srcAmount };

            const response = await paraswapFetcher.createTransaction(
                body,
                networkId,
                gasPrice,
            );

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
