import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import { IInvoiceGetOneResponseWithRequest } from '@src/interfaces/request-network';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import InvoiceListItem from './InvoiceItemCard';

interface IProps {
    invoiceId: string;
    items: IInvoiceGetOneResponseWithRequest['invoiceItems'];
}

export default function InvoiceItemList({
    invoiceId,
    items,
}: IProps): ReactElement {
    const { t } = useTranslation();
    return (
        <>
            {items.length ? (
                <ul className="w-full h-full p-4 overflow-y-auto border-gray-200 divide-y-2 divide-gray-200 scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-200">
                    {items.map((item) => (
                        <InvoiceListItem
                            key={item.name}
                            invoiceId={invoiceId}
                            item={item}
                        />
                    ))}
                </ul>
            ) : (
                <FlexContainer direction="flex-row" justify="justify-center">
                    <Text
                        text={t('myInvoices.noInvoiceSelected')}
                        className="flex items-start justify-center w-full h-full my-4 font-semibold text-center text-gray-600 "
                    />
                </FlexContainer>
            )}
        </>
    );
}
