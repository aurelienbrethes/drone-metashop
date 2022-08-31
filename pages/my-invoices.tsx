import InvoiceCardList from '@components/Invoices/InvoiceCardList';
import InvoiceListPortal from '@components/Invoices/InvoiceListPortal';
import InvoiceItemList from '@components/Invoices/InvoicesList';
import FlexContainer from '@components/UI/FlexContainer';
import usePrices from '@hooks/usePrices';
import { IInvoiceGetOneResponseWithRequest } from '@src/interfaces/request-network';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import InvoiceCheckoutButton from '@components/Invoices/InvoiceCheckoutButton';
import useInvoicesState from '@src/hooks/useInvoicesState';
import RequestInvoicingButton from '@components/Invoices/RequestInvoicingButton';
import { useTranslation } from 'react-i18next';

export default function Myinvoices(): JSX.Element {
    const { historyItems } = useInvoicesState();
    const { t } = useTranslation();
    const [invoiceItems, setInvoiceItems] = useState<{
        invoiceId: string;
        items: IInvoiceGetOneResponseWithRequest['invoiceItems'];
        status: string;
    }>({ invoiceId: '', items: [], status: '' });

    const { computeTotalCryptoToFIAT } = usePrices();

    const price = computeTotalCryptoToFIAT(
        invoiceItems.items,
        historyItems.find(
            (item) =>
                item.invoiceId.toLowerCase() ===
                invoiceItems.invoiceId.toLowerCase(),
        )?.currencyDecimals || 2,
    );

    return (
        <div
            id="invoice-page"
            className="relative flex flex-col w-full p-1 px-2 min-h-body max-w-7xl sm:flex-row"
        >
            <FlexContainer
                direction="flex-col"
                justify="justify-start"
                className="flex w-full h-full p-0 md:border-r-2 sm:p-2 md:p-4 sm:w-3/5"
            >
                <h1 className="my-4 text-xl font-semibold sm:text-2xl md:text-2xl">
                    {t('myInvoices.title')}
                </h1>
                <InvoiceCardList
                    items={historyItems}
                    setInvoiceItems={setInvoiceItems}
                />
            </FlexContainer>
            <AnimatePresence>
                {!!invoiceItems.items.length && (
                    <InvoiceListPortal
                        invoiceId={invoiceItems.invoiceId}
                        setInvoiceItems={setInvoiceItems}
                        invoiceItems={invoiceItems.items}
                    />
                )}
            </AnimatePresence>
            <FlexContainer
                direction="flex-col"
                justify="justify-start"
                className="hidden w-2/5 p-8 sm:flex"
            >
                <InvoiceItemList
                    invoiceId={invoiceItems.invoiceId}
                    items={invoiceItems.items}
                />
                <>
                    {!!invoiceItems.items.length &&
                        (invoiceItems.status !== 'paid' ? (
                            <InvoiceCheckoutButton price={price} />
                        ) : (
                            <RequestInvoicingButton
                                invoiceId={invoiceItems.invoiceId}
                            />
                        ))}
                </>
            </FlexContainer>
        </div>
    );
}
