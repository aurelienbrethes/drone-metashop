import { invoiceCurrencies } from '@src/constants/currencies.contants';
import {
    AcceptedPaymentCurrenciesSymbols,
    IInvoiceCurrency,
} from '@src/interfaces/currencies';

export const invoiceNumberGenerator = (buyerFullName: string): string => {
    const date = new Date();

    const year = date.getFullYear().toString();

    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month;

    let day = date.getDate().toString();
    day = day.length === 1 ? `0${day}` : day;

    let hour = date.getHours().toString();
    hour = hour.length === 1 ? `0${hour}` : hour;

    let minute = date.getMinutes().toString();
    minute = minute.length === 1 ? `0${minute}` : minute;

    let second = date.getSeconds().toLocaleString();
    second = second.length === 1 ? `0${second}` : second;

    return `${year}${month}${day}-${hour}${minute}${second}/${buyerFullName.replace(
        ' ',
        '',
    )}`;
};

export const invoiceNameGenerator = (items: string[]): string =>
    items.join('-');

/**
 * @description Get invoice currency infos for a given payment currency (e.g: USD and its details when you pay with USDC cryptos)
 * @param paymentCurrency string that correspond to the accepted payment currency with the network (e.g: USDC-matic)
 * @returns IInvoiceCurrency object with the invoice currency and its decimals or undefined if the payment currency is not accepted
 */
export const getInvoiceCurrencyInfos = (
    paymentCurrency: string,
): IInvoiceCurrency | undefined => {
    const paymentCurrencySymbol = paymentCurrency?.split('-')[0];

    return invoiceCurrencies[
        paymentCurrencySymbol as AcceptedPaymentCurrenciesSymbols // 👈 Not really but this is to prenvent ts error, if not, return undefined
    ];
};
