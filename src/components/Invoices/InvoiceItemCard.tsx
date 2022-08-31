import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import usePrices from '@hooks/usePrices';
import { InvoiceItem } from '@src/interfaces/request-network';
import Image from 'next/image';
import React from 'react';
import useInvoicesState from '@src/hooks/useInvoicesState';
import { useTranslation } from 'react-i18next';

interface IProps {
    invoiceId: string;
    item: InvoiceItem;
}

const InvoiceListItem = ({ invoiceId, item }: IProps): JSX.Element => {
    const { historyItems } = useInvoicesState();
    const { t } = useTranslation();

    const { computeTotalCryptoToFIAT } = usePrices();

    if (!item)
        return (
            <FlexContainer
                justify="justify-between"
                direction="flex-row"
                className="items-center w-full p-4 my-8 text-sm align-middle"
            >
                <Text text={t('myInvoices.invoiceitemCard.error')} />
                <Image src="/icons/fail.svg" width={30} height={30} />
            </FlexContainer>
        );

    return (
        <li className="relative flex items-center justify-between w-full py-4 my-4 text-sm">
            <div className="relative flex-shrink-0 w-24 h-full overflow-hidden border-2 border-gray-200 aspect-1">
                <Image
                    priority
                    quality={50}
                    placeholder="blur"
                    blurDataURL="/images/product_placeholder.png"
                    src="/images/product_placeholder.png"
                    layout="fill"
                />
            </div>
            <FlexContainer
                justify="justify-between"
                className="w-full h-24 mx-4 flex-shrink-1 "
                direction="flex-col"
            >
                <Text text={item.name} className="font-semibold" />
                <Text
                    text={`${t('myInvoices.invoiceitemCard.quantity')} : ${
                        item.quantity
                    }`}
                    className="flex"
                />
            </FlexContainer>
            <FlexContainer
                className="items-end h-24 font-semibold "
                direction="flex-row"
                justify="justify-end"
            >
                <Text
                    text={computeTotalCryptoToFIAT(
                        [item],
                        historyItems.find(
                            (historyItem) =>
                                historyItem.invoiceId.toLowerCase() ===
                                invoiceId.toLowerCase(),
                        )?.currencyDecimals || 2,
                    )}
                />
            </FlexContainer>
        </li>
    );
};
export default InvoiceListItem;
