/* eslint-disable @typescript-eslint/no-explicit-any */
export type Address = string;
export type NumberAsString = string;

export type OptimalRoute = {
    percent: number;
    swaps: OptimalSwap[];
};

export type OptimalSwap = {
    srcToken: Address;
    srcDecimals: number;
    destToken: Address;
    destDecimals: number;
    swapExchanges: OptimalSwapExchange<any>[];
};

export type OptimalSwapExchange<T> = {
    exchange: string;
    srcAmount: NumberAsString;
    destAmount: NumberAsString;
    percent: number;
    data?: T;
    poolAddresses?: Array<Address>;
};

export enum SwapSide {
    BUY = 'BUY',
    SELL = 'SELL',
}

export type OptionalRate = {
    exchange: string;
    srcAmount: NumberAsString;
    destAmount: NumberAsString;
    unit?: NumberAsString;
    data?: any;
};

export type OptimalRate = {
    blockNumber: number;
    network: number;
    srcToken: Address;
    srcDecimals: number;
    srcAmount: NumberAsString;
    srcUSD: NumberAsString;
    destToken: Address;
    destDecimals: number;
    destAmount: NumberAsString;
    destUSD: NumberAsString;
    bestRoute: OptimalRoute[];
    gasCostUSD: NumberAsString;
    gasCost: NumberAsString;
    others?: OptionalRate[];
    side: SwapSide;
    contractMethod: string;
    tokenTransferProxy: Address;
    contractAddress: Address;
    maxImpact?: number;
    maxUSDImpact?: number;
    maxImpactReached?: boolean;
    partner?: string;
    partnerFee: number;
    hmac: string;
};

// Custom types

export interface IGetOptimalRateParams {
    srcToken: string;
    srcDecimals: number;
    destToken: string;
    destDecimals: number;
    amount: number;
    network: number;
    side: SwapSide;
    userAddress: string;
    excludeDirectContractMethods?: boolean;
    otherExchangePrices?: boolean;
}

export interface IGetOptimalRateResponse {
    priceRoute: OptimalRate;
}

export interface IParaswapTransactionBody {
    srcToken: string;
    destToken: string;
    srcAmount?: string;
    destAmount: string;
    userAddress: string;
    receiver?: string;
    partnerAddress?: string;
    partnerFeeBps?: number;
    partner?: string;
    slippage?: number;
    priceRoute: OptimalRate; // 👆 In the Get Optimal Rate section
}

export type ISwapTransactionArgs = Omit<IParaswapTransactionBody, 'partner'>;

export interface ISwapTransactionParams {
    ignoreGasEstimate: boolean;
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
}

export interface IParaswapTransactionResponse {
    from: string;
    to: string;
    value: string;
    data: string;
    gas: string;
    gasPrice: string;
    chainId: string;
}

export interface IGasPricesResponse {
    safeLow: IGasPrice;
    average: IGasPrice;
    fast: IGasPrice;
    fastest: IGasPrice;
    blockData: IBlockData;
}

export interface IGasPrice {
    legacyGasPrice: string;
    maxPriorityFeePerGas: string;
    maxFeePerGas: string;
}

export interface IGasPriceParams {
    ignoreGasEstimate: boolean;
    maxPriorityFeePerGas: string;
    maxFeePerGas: string;
}

export interface IBlockData {
    baseFeePerGasWei: string;
    blockNumber: number;
}
