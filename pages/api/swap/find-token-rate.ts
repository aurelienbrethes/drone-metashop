import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import sendError from '@fetcher/sendError';
import { IError } from '@src/interfaces/api';
import paraswapFetcher from '@fetcher/paraswap.fetcher';
import { swapPartnerDetails } from '@src/constants/swap.partner.constants';
import { TokenRateBody, TokenRateResponse } from '@src/interfaces/swap-payment';
import { calculateAmountWithFees } from '@utils/paraswap.utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TokenRateResponse | IError>,
) {
    // TODO: add middleware to ckeck the body
    if (req.method === 'POST') {
        try {
            const {
                srcToken,
                srcDecimals,
                destToken,
                destDecimals,
                amount: bodyAmount,
                userAddress,
                side,
                network,
                mode,
                /*
                TODO: passed on these into body only with 2 fetchers findTokenRateForSwap and findTokenRateForSwapTransfer
                  excludeDirectContractMethods,
                  otherExchangePrices,
                 */
            } = req.body as TokenRateBody;

            const amount =
                mode === 'transfer'
                    ? calculateAmountWithFees(
                          bodyAmount,
                          swapPartnerDetails.partnerFeePercentage / 100,
                      )
                    : bodyAmount;

            const queryString = `?srcToken=${srcToken}&srcDecimals=${srcDecimals}&destToken=${destToken}&destDecimals=${destDecimals}&amount=${amount}&network=${network}&side=${side}&userAddress=${userAddress}${
                mode === 'transfer'
                    ? `&partner=${swapPartnerDetails.partnerName}&excludeDirectContractMethods=true&otherExchangePrices=true`
                    : ''
            }`;

            const { priceRoute: optimalRate } =
                await paraswapFetcher.getOptimalRate(queryString);
            return res.status(200).json({ optimalRate });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return sendError(res, error);
            }
            return res.status(500).json({ errors: (error as Error).message });
        }
    }
    return res.status(404).json({ errors: 'Method not allowed' });
}
