import {
    IGasPrice,
    IGasPriceParams,
    IGasPricesResponse,
    IGetOptimalRateParams,
    IGetOptimalRateResponse,
    IParaswapTransactionBody,
    IParaswapTransactionResponse,
    ISwapTransactionParams,
    OptimalRate,
} from './paraswap';

export interface IPaymentSwapInfos {
    cryptoAmount: number;
    cryptoAmountDisplayed: string;
    paymentCurrencyToken: string;
    paymentCurrencyDecimals: number;
}

export type SwapMode = 'swap' | 'transfer';

export type TokenRateBody = Omit<
    IGetOptimalRateParams,
    'excludeDirectContractMethods' | 'otherExchangePrices'
> & { mode: SwapMode };

export type TokenRateResponse = Omit<IGetOptimalRateResponse, 'priceRoute'> & {
    optimalRate: OptimalRate;
};

export type SwapTransactionBody = Omit<
    IParaswapTransactionBody,
    'receiver' | 'partnerAddress' | 'partnerFeeBps' | 'partner'
> & {
    networkId: number;
    mode: SwapMode;
};

export type SwapTransactionArgs = SwapTransactionBody & {
    gasPrice?: GasPriceParams;
};

export type SwapTransactionResponse = IParaswapTransactionResponse;

export type SwapTransactionParams = ISwapTransactionParams;

export type GasPrice = IGasPrice;

export type GasPriceParams = IGasPriceParams;

export type GasPricesResponse = IGasPricesResponse;
