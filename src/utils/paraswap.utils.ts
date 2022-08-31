/* eslint-disable import/no-cycle */
import tokensList, {
    TokenListNetworks,
    tokenListChainId,
} from '@src/constants/tokens-list.constant';

/**
 * @description Returns the token list for the given network
 * @param networkName the payment network name (e.g: 'rinkeby')
 * @returns array of corresponding tokens list
 */
const getTokensList = (
    networkName: string,
    option: 'accepted' | 'all' = 'all',
): IToken[] => {
    if (
        Object.values(TokenListNetworks).includes(
            networkName as TokenListNetworks,
        )
    ) {
        return tokensList[networkName as TokenListNetworks][option];
    }
    return [];
};

export default getTokensList;

/**
 * @description Replace FAU contract address on Rinkeby by DAI on Ropsten for dev compatibility
 * @description Request protocol deployed on Rinkeby and ParaSwap on Ropsten
 * @param network (e.g: 'rinkeby' or 'matic')
 * @param paymentCurrencyAddress as token contract address
 * @returns string (e.g: '0x0000000000000000000000000000000000000000')
 */
export const getPaymentContractAddress = (
    network: string,
    paymentCurrencyAddress: string,
): string =>
    network === 'rinkeby'
        ? '0xaD6D458402F60fD3Bd25163575031ACDce07538D'
        : paymentCurrencyAddress;

/**
 * @description Check if a the allowed token amount allowed is greater than the amount be spend
 * @param allowedAmount the token amount already allowed
 * @param amountToTransfer the token amount you want to spend
 * @returns boolean
 */
export const isAmountAllowed = (
    allowedAmount: number,
    amountToTransfer: number,
): boolean => allowedAmount > amountToTransfer;

/**
 * @description Returns the chainId for the given network (to make rinkeby/ropsten development bridge)
 * @param networkName the payment network name (e.g: 'rinkeby')
 * @returns array of corresponding tokens list
 */
export const getPaymentChainId = (networkName: string): number => {
    if (
        Object.values(TokenListNetworks).includes(
            networkName as TokenListNetworks,
        )
    ) {
        return tokenListChainId[networkName as TokenListNetworks];
    }
    return 0;
};

/**
 * @description Calculate the exact amount to requires in swap&transfer request applying partner fees
 * @param amount the amount to transfer
 * @param feesPercentage the partner fee
 * @returns number the exact amount to transfer
 */
export const calculateAmountWithFees = (
    amount: number,
    feesPercentage: number,
): number => (amount * 100) / (100 - feesPercentage);

/**
 * @description Check if a string is included in the given token infos (address, name, symbol)
 * @param tokens the list of tokens to check
 * @param {string} filter a string checked in the given token
 * @returns {boolean} true/false if the token includes or no the filter
 */
export const filterTokensList = (tokens: IToken[], filter: string): IToken[] =>
    filter
        ? tokens.filter(
              (t) =>
                  t.address.toLowerCase().includes(filter.toLowerCase()) ||
                  t.name.toLowerCase().includes(filter.toLowerCase()) ||
                  t.symbol.toLowerCase().includes(filter.toLowerCase()),
          )
        : tokens;
