import Button from '@components/UI/Button';
import usePrices from '@hooks/usePrices';
import useInvoicesState from '@src/hooks/useInvoicesState';
import { IInvoiceGetOneResponseWithRequest } from '@src/interfaces/request-network';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import InvoiceCheckoutButton from './InvoiceCheckoutButton';
import InvoiceListItems from './InvoicesList';

interface Props {
    invoiceId: string;
    invoiceItems: IInvoiceGetOneResponseWithRequest['invoiceItems'];
    setInvoiceItems: Dispatch<
        SetStateAction<{
            invoiceId: string;
            items: IInvoiceGetOneResponseWithRequest['invoiceItems'];
            status: string;
        }>
    >;
}

export default function InvoiceListPortal({
    invoiceId,
    setInvoiceItems,
    invoiceItems,
}: Props): JSX.Element {
    const { computeTotalCryptoToFIAT } = usePrices();
    const { historyItems } = useInvoicesState();

    const price = computeTotalCryptoToFIAT(
        invoiceItems,
        historyItems[0]?.currencyDecimals || 2,
    );

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ default: { duration: 0.3 } }}
            className=" w-full h-full absolute top-0 right-0 sm:hidden p-4 z-50 flex flex-col items-start  bg-white "
        >
            <Button
                type="button"
                handleClick={() =>
                    setInvoiceItems({ invoiceId: '', items: [], status: '' })
                }
            >
                <Image src="/images/arrow.png" width={12} height={20} />
            </Button>
            <InvoiceListItems invoiceId={invoiceId} items={invoiceItems} />
            <InvoiceCheckoutButton price={price} />
        </motion.div>,
        document.body,
    );
}
