import {
    IGasPriceParams,
    IGasPricesResponse,
    IGetOptimalRateResponse,
    IParaswapTransactionBody,
    IParaswapTransactionResponse,
} from '@src/interfaces/paraswap';
import paraswapApi from './utils/paraswap.fetcher.utils';

const paraswapFetcher = {
    getOptimalRate: async (query: string): Promise<IGetOptimalRateResponse> =>
        (await paraswapApi.get(`/prices/${query}`)).data,

    /**
     * used for swap transaction AND swap and transfer transaction
     * @param body
     * @param networkId
     * @param gasPrice
     * @returns
     */
    createTransaction: async (
        body: IParaswapTransactionBody,
        networkId?: number,
        gasPrice?: IGasPriceParams,
    ): Promise<IParaswapTransactionResponse> =>
        (
            await paraswapApi.post(
                `/transactions/${networkId}${
                    gasPrice
                        ? `?${Object.entries(gasPrice)
                              .map((entry) => entry.join('='))
                              .join('&')}`
                        : ''
                }`,
                body,
            )
        ).data,

    getGasPrices: async (networId: number): Promise<IGasPricesResponse> =>
        (await paraswapApi.get(`/prices/gas/${networId}?eip1559=true`)).data,
};

export default paraswapFetcher;
