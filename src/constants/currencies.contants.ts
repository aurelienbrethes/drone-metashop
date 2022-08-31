import {
    AcceptedCurrencies,
    AcceptedPaymentCurrencies,
    AcceptedPaymentCurrenciesSymbols,
    ICurrenciesSymbols,
} from '@interfaces/currencies';

const acceptedCurrencies: ICurrenciesSymbols = {
    [AcceptedCurrencies.EUR]: '€',
    [AcceptedCurrencies.USD]: '$',
    [AcceptedCurrencies.FAU]: 'FAU',
};

export default acceptedCurrencies;

export const invoiceCurrencies: AcceptedPaymentCurrencies = {
    [AcceptedPaymentCurrenciesSymbols.FAU]: {
        invoiceCurrency: 'FAU',
        decimals: 18,
    },
    [AcceptedPaymentCurrenciesSymbols.jEUR]: {
        invoiceCurrency: 'EUR',
        decimals: 2,
    },
    [AcceptedPaymentCurrenciesSymbols.USDC]: {
        invoiceCurrency: 'USD',
        decimals: 2,
    },
};
