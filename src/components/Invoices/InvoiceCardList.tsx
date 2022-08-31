import { IInvoiceGetOneResponseWithRequest } from '@src/interfaces/request-network';
import React, { ReactElement } from 'react';
import InvoiceCard from './InvoiceCard';

interface IProps {
    items: ILocalStorageInvoiceIdSession[];
    setInvoiceItems: (invoiceItems: {
        invoiceId: string;
        items: IInvoiceGetOneResponseWithRequest['invoiceItems'];
        status: string;
    }) => void;
}

export default function InvoiceCardList({
    items,
    setInvoiceItems,
}: IProps): ReactElement {
    return (
        <div className="w-full h-full divide-y-2 divide-gray-200">
            {items.map((item) => (
                <InvoiceCard
                    key={item.invoiceId}
                    invoiceId={item.invoiceId}
                    orderId={item.orderId}
                    setInvoiceItems={setInvoiceItems}
                />
            ))}
        </div>
    );
}
