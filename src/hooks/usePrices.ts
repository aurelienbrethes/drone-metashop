import acceptedCurrencies from '@constants/currencies.contants';
import { AcceptedCurrencies } from '@interfaces/currencies';
import { InvoiceItem } from '@src/interfaces/request-network';
import {
    calculateFullPrice,
    calculateTaxAmount,
    roundPrice,
    sanitizeAmount,
} from '@utils/prices.utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const usePrices = (
    price?: string,
    taxRate?: string,
    minPrice?: string | null,
    maxPrice?: string | null,
) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY || 'EUR';
    const { t } = useTranslation();
    const currencySymbol = acceptedCurrencies[currency as AcceptedCurrencies];

    const [displayedPrice, setDisplayedPrice] = useState<string>(
        price
            ? `${(+sanitizeAmount(price))
                  .toFixed(2)
                  .toString()}${currencySymbol}`
            : 'No price provided',
    );

    const computeAmount = (
        calculation: (
            calculatedPrice: number,
            calculatedTaxRate: number,
        ) => number,
        computedPrice?: string,
        computedTaxRate?: string,
    ): string => {
        if (computedPrice && computedTaxRate) {
            return calculation(
                +sanitizeAmount(computedPrice),
                +sanitizeAmount(computedTaxRate),
            )
                .toFixed(2)
                .toString();
        }
        if (computedPrice && !computedTaxRate) {
            return roundPrice(+sanitizeAmount(computedPrice), 2)
                .toFixed(2)
                .toString();
        }
        return `${t('utils.usePrices.noPrice')}`;
    };

    const taxAmount = computeAmount(calculateTaxAmount, price, taxRate);

    useEffect(() => {
        if (price)
            setDisplayedPrice(
                price?.toLocaleLowerCase() !==
                    'No tax provided'.toLocaleLowerCase()
                    ? `${price}${currencySymbol}`
                    : price,
            );
        else setDisplayedPrice('No price provided');
    }, [price, currencySymbol]);

    const priceBrackets =
        minPrice && maxPrice && minPrice !== maxPrice
            ? `${minPrice}${currencySymbol} - ${maxPrice}${currencySymbol}`
            : null;

    const computeTotalCartPrice = (items: CartItem[]): string =>
        items
            .reduce((acc, item) => acc + item.quantity * +item.price, 0)
            .toFixed(2)
            .toString();

    const computeTotalCartTaxAmount = (items: CartItem[]): string =>
        items
            .reduce(
                (acc, item) =>
                    acc +
                    item.quantity *
                        calculateTaxAmount(
                            +sanitizeAmount(item.price),
                            item.taxRate ? +sanitizeAmount(item.taxRate) : 0,
                        ),
                0,
            )
            .toFixed(2)
            .toString();

    const computeTotalPreTaxPrice = (items: CartItem[]): string =>
        (+computeTotalCartPrice(items) - +computeTotalCartTaxAmount(items))
            .toFixed(2)
            .toString();

    const computeTotalInvoiceTaxAmount = (items: InvoiceItem[]): string =>
        items
            .reduce(
                (acc, item) =>
                    acc +
                    item.quantity *
                        calculateTaxAmount(
                            +calculateFullPrice(
                                +sanitizeAmount(item.unitPrice),
                                +item.tax.amount,
                            ),
                            item.tax ? +sanitizeAmount(item.tax.amount) : 0,
                        ),
                0,
            )
            .toFixed(2)
            .toString();

    const computeTotalInvoicePrice = (
        items: InvoiceItem[],
        decimals: number,
    ): string =>
        roundPrice(
            items.reduce(
                (acc, item) => acc + +item.unitPrice + +item.tax.amount,
                0,
            ) /
                10 ** decimals,
            2,
        ).toString();

    const computeTotalCryptoToFIAT = (
        items: InvoiceItem[],
        decimals: number,
    ): string =>
        `${+computeTotalInvoicePrice(items, decimals)} ${currencySymbol}`;

    return {
        currencySymbol,
        currency,
        displayedPrice,
        taxAmount,
        priceBrackets,
        computeTotalCartTaxAmount,
        computeTotalInvoiceTaxAmount,
        computeTotalPreTaxPrice,
        computeTotalCartPrice,
        computeTotalInvoicePrice,
        computeTotalCryptoToFIAT,
    };
};

export default usePrices;
