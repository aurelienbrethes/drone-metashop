import React, { ReactElement, useState } from 'react';
import { IInvoiceGetOneResponseWithRequest } from '@src/interfaces/request-network';
import usePrices from '@hooks/usePrices';
import { useMutation, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import LoaderComponent from '@components/UI/LoaderComponent';
import Button from '@components/UI/Button';
import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import { motion } from 'framer-motion';
import useInvoicesState from '@src/hooks/useInvoicesState';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import { invoices, orders } from '@fetcher/next-api.fetcher';
import { TrashIcon } from '@heroicons/react/solid';
import { getInvoiceCurrencyInfos } from '@utils/invoices.utils';
import CustomToast from '@components/Toats/CustomToast';
import StatusIcon from './StatusIcon';

interface IProps {
    invoiceId: string;
    setInvoiceItems: (invoiceItems: {
        invoiceId: string;
        items: IInvoiceGetOneResponseWithRequest['invoiceItems'];
        status: string;
    }) => void;
    orderId: number;
}

export default function InvoiceCard({
    invoiceId,
    orderId,
    setInvoiceItems,
}: IProps): ReactElement {
    const [decimals, setDecimals] = useState(2);
    const { t } = useTranslation();
    const { triggerDispatchSetHistoryItemDecimals } = useInvoicesState();

    const { data, isLoading } = useQuery(
        `getInvoice-${invoiceId}`,
        () => invoices.getOne(invoiceId),
        {
            onSuccess: (responseData) => {
                const currencyDecimals =
                    getInvoiceCurrencyInfos(responseData.paymentCurrency)
                        ?.decimals || 2;
                setDecimals(currencyDecimals);
                triggerDispatchSetHistoryItemDecimals({
                    invoiceId,
                    decimals: currencyDecimals,
                });
            },
        },
    );

    const { dispatchOrderId, dispatchBuyerInfos } = useCheckoutFromStore();

    const { computeTotalCryptoToFIAT } = usePrices();

    const displayedPrice = computeTotalCryptoToFIAT(
        data?.invoiceItems || [],
        decimals,
    );

    const { dispatchRemoveInvoiceId } = useInvoicesState();

    const { mutate: cancelOrder } = useMutation((orderToCancel: number) =>
        orders.cancel(orderToCancel),
    );

    const { mutate: cancelInvoiceMutation } = useMutation(
        () => invoices.cancelOne(invoiceId),
        {
            onSuccess: async () => {
                toast(
                    <CustomToast message={t('myInvoices.cancelSuccessfull')} />,
                );
                await cancelOrder(orderId);
                await dispatchRemoveInvoiceId(invoiceId);
                await setInvoiceItems({ invoiceId: '', items: [], status: '' });
            },
        },
    );

    if (isLoading || !data) return <LoaderComponent />;

    const handleClick = () => {
        setInvoiceItems({
            invoiceId,
            items: data.invoiceItems,
            status: data.status,
        });
        dispatchOrderId(orderId);
        dispatchBuyerInfos(data.buyerInfo);
    };

    const handleRemoveFromLocalStorage = async () => {
        if (data.status === 'open') {
            return cancelInvoiceMutation();
        }

        await dispatchRemoveInvoiceId(invoiceId);
        await setInvoiceItems({ invoiceId: '', items: [], status: '' });
        return toast(
            <CustomToast message={t('myInvoices.removeSuccessfull')} />,
        );
    };

    if (!data)
        return (
            <FlexContainer
                direction="flex-row"
                justify="justify-center"
                className="items-center h-32 bg-black p-4s bg-opacity-30"
            >
                <Text text="Error" className="mx-2 font-semibold" />
                <Image
                    placeholder="blur"
                    blurDataURL="/icons/fail.svg"
                    src="/icons/fail.svg"
                    width={15}
                    height={15}
                />
            </FlexContainer>
        );

    return (
        <motion.div
            onClick={handleClick}
            initial={{ backgroundColor: '#fff' }}
            whileHover={{ backgroundColor: '#99f6e4' }}
            transition={{ duration: 0.2 }}
            className="flex justify-between w-full px-4 py-4 rounded-md focus:outline focus:outline-teal-200"
        >
            <FlexContainer
                direction="flex-col"
                justify="justify-between"
                className="h-full text-left"
            >
                <Text
                    className="font-semibold"
                    text={new Date(
                        data?.creationDate as string,
                    ).toLocaleDateString()}
                />
                <FlexContainer justify="justify-center" direction="flex-row">
                    <Text text={t('myInvoices.ordered')} />
                    <Text
                        className="mx-1 text-sm font-semibold"
                        text={`${data?.invoiceItems.length} ${t(
                            'myInvoices.invoiceCard.products',
                        )}`}
                    />
                </FlexContainer>
            </FlexContainer>
            <FlexContainer
                direction="flex-col"
                justify="justify-between"
                className="h-full text-right align-middle item-center"
            >
                <FlexContainer
                    justify="justify-center"
                    direction="flex-row"
                    className="items-center"
                >
                    <Text
                        className="mx-2"
                        text={`${t('myInvoices.invoiceCard.status')} : ${
                            data?.status || 'pending'
                        }`}
                    />

                    <StatusIcon status={data.status} />
                </FlexContainer>
                <FlexContainer
                    justify="justify-end"
                    direction="flex-row"
                    className="items-end"
                >
                    <Text
                        text={`${t(
                            'myInvoices.invoiceCard.price',
                        )} : ${displayedPrice}`}
                    />
                </FlexContainer>
                <Button
                    className="flex items-center justify-center px-2 py-1 align-middle bg-red-600 rounded-md"
                    handleClick={handleRemoveFromLocalStorage}
                >
                    <Text
                        text={t('myInvoices.deleteInvoiceButton')}
                        className="text-xs font-bold text-white"
                    />
                    <TrashIcon width={15} height={15} color="white" />
                </Button>
            </FlexContainer>
        </motion.div>
    );
}
