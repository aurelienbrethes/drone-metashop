import { InvoiceItem } from '@src/interfaces/request-network';
import { invoiceNameGenerator } from '@utils/invoices.utils';
import { sanitizeAmount } from '@utils/prices.utils';
import { IInvoiceCurrency } from '@src/interfaces/currencies';

export const transformLineItemsIntoInvoiceItems = (
    bodyItems: ILineItem[],
    invoiceCurrency: IInvoiceCurrency,
): InvoiceItem[] => {
    const { decimals, invoiceCurrency: currency } = invoiceCurrency;
    return bodyItems.map(({ name, quantity, total_tax: totalTax, total }) => ({
        name: invoiceNameGenerator([`${quantity} x ${name}`]),
        currency,
        quantity: 1,
        tax: {
            type: 'fixed',
            amount: `${+sanitizeAmount(totalTax) * 10 ** decimals}`,
        },
        unitPrice: `${+sanitizeAmount(total) * 10 ** decimals}`,
    }));
};

export default transformLineItemsIntoInvoiceItems;
