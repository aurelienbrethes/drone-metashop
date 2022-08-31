export enum AcceptedCurrencies {
    EUR = 'EUR',
    USD = 'USD',
    FAU = 'FAU',
}

export type ICurrenciesSymbols = {
    [key in AcceptedCurrencies]: string;
};

export enum AcceptedPaymentCurrenciesSymbols {
    jEUR = 'jEUR',
    USDC = 'USDC',
    FAU = 'FAU',
}

export interface IInvoiceCurrency {
    invoiceCurrency: string;
    decimals: number;
}

export type AcceptedPaymentCurrencies = {
    [key in AcceptedPaymentCurrenciesSymbols]: IInvoiceCurrency;
};
