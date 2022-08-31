/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { orders, swapFetcher } from '@fetcher/next-api.fetcher';
import AwaitingRequest from '@components/Checkout/AwaitingRequest';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { useMetaMask } from 'metamask-react';

import EndingCheckout from '@components/Checkout/EndingCheckout';
import useCheckoutFromStore from '@hooks/useCheckoutFromStore';
import {
    IError,
    IGetPaymentInfosResponse,
    IUpdatePaymentStatusResponse,
    IValidatePaymentHandlerArgs,
} from '@src/interfaces/api';
import useCartFromStore from '@src/hooks/useCartFromStore';
import Container from '@components/Checkout/Container';
import PaymentContainer from '@components/Checkout/PaymentContainer';
import {
    SwapTransactionArgs,
    SwapTransactionResponse,
    TokenRateResponse,
} from '@src/interfaces/swap-payment';
import {
    getPaymentChainId,
    getPaymentContractAddress,
} from '@utils/paraswap.utils';
import usePrices from '@src/hooks/usePrices';
import CustomToast from '@components/Toats/CustomToast';
import { useTranslation } from 'react-i18next';
import { sendErc20Transaction } from '@matthias_wanner/web3_utils';

const PaymentSwap: NextPage = () => {
    const { t } = useTranslation();
    const {
        orderId,
        isAwaitingRequest,
        isPaying,
        isPayed,
        cryptoSelected,
        dispatchSetPaymentSwapInfos,
        dispatchIsPayed,
        dispatchIsPaying,
        dispatchPaymentNetwork,
        dispatchCryptoSelected,
    } = useCheckoutFromStore();

    const { triggerDispatchEmpty } = useCartFromStore();

    const { ethereum, account } = useMetaMask();
    const { currencySymbol } = usePrices();

    const { data, isLoading: paymentInfosLoading } = useQuery<
        IGetPaymentInfosResponse,
        AxiosError<IError>
    >(
        ['orders', orderId, 'paymentInfos'],
        () => orders.getPaymentInfos(orderId),
        {
            enabled: !!orderId && !isPayed,
            onSuccess: (res) => {
                dispatchCryptoSelected({
                    ...cryptoSelected,
                    chainId: getPaymentChainId(
                        res.paymentCurrency.network.toLowerCase(),
                    ),
                });
                dispatchSetPaymentSwapInfos({
                    cryptoAmount: res.amount,
                    cryptoAmountDisplayed: `${
                        res.amount / 10 ** res.paymentCurrency.decimals
                    } ${currencySymbol}`,
                    paymentCurrencyToken: getPaymentContractAddress(
                        res.paymentCurrency.network,
                        res.paymentCurrency.contractAddress,
                    ),
                    paymentCurrencyDecimals: res.paymentCurrency.decimals,
                });

                dispatchPaymentNetwork(res.paymentCurrency.network);
            },
            onError: (err) => {
                toast.error(
                    err.response?.data?.errors || err.response?.data?.message,
                );
            },
            retry: false,
        },
    );

    const { mutateAsync: updateOrder } = useMutation<
        IUpdatePaymentStatusResponse,
        AxiosError<IError>,
        IValidatePaymentHandlerArgs
    >(orders.validatePayment);

    const { data: tokenRateData } = useQuery<
        TokenRateResponse,
        AxiosError<IError>
    >(['pay', account, cryptoSelected.address, 'tokenRate'], {
        enabled: false,
    });

    const { mutateAsync: swapTransferTransaction } = useMutation<
        SwapTransactionResponse,
        AxiosError<IError>,
        SwapTransactionArgs
    >(swapFetcher.swapPayment);

    const handlePay = async () => {
        try {
            dispatchIsPaying(true);
            if (!ethereum || !account)
                throw new Error(t('payment.connectMetamask'));

            const chainId = `0x${cryptoSelected.chainId.toString(16)}`;

            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }], // chainId must be stringified hexadecimal
            });

            let txHash = null;
            if (
                cryptoSelected.address.toLowerCase() ===
                data?.paymentCurrency.contractAddress.toLowerCase()
            ) {
                txHash = await sendErc20Transaction({
                    amount: data.amount,
                    contractAddress: cryptoSelected.address,
                    windowEthereum: ethereum,
                    receiverAddress: data.paymentAddress,
                });
            } else if (data && !paymentInfosLoading && tokenRateData) {
                const { gas, gasPrice, ...rest } =
                    await swapTransferTransaction({
                        srcToken: tokenRateData.optimalRate.srcToken,
                        srcAmount: tokenRateData.optimalRate.srcAmount,
                        destToken: tokenRateData.optimalRate.destToken,
                        destAmount: tokenRateData.optimalRate.destAmount,
                        userAddress: account,
                        networkId: tokenRateData.optimalRate.network,
                        priceRoute: tokenRateData.optimalRate,
                        mode: 'transfer',
                        // slippage: 200, later user will choose this value
                    });

                txHash = await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [rest],
                });
            } else {
                throw new Error(t('payment.awaitingPaymentInformations'));
            }

            await updateOrder({
                orderId,
                txHash,
            });

            triggerDispatchEmpty();
            dispatchIsPayed(true);
        } catch (error) {
            dispatchIsPaying(false);
            toast.error(<CustomToast message={(error as Error).message} />);
        } finally {
            dispatchIsPaying(false);
        }
    };

    if (isPaying || isAwaitingRequest || paymentInfosLoading) {
        return (
            <Container>
                <AwaitingRequest isPaying={isPaying} />
            </Container>
        );
    }

    return (
        <Container>
            {!isPayed ? (
                <PaymentContainer
                    handlePay={handlePay}
                    spenderAddress={
                        cryptoSelected.address.toLowerCase() ===
                        data?.paymentCurrency.contractAddress.toLowerCase()
                            ? account
                            : tokenRateData?.optimalRate?.tokenTransferProxy ||
                              null
                    }
                    amount={
                        cryptoSelected.address.toLowerCase() ===
                        data?.paymentCurrency.contractAddress.toLowerCase()
                            ? data?.amount || 0
                            : +(tokenRateData?.optimalRate?.srcAmount || '0')
                    }
                />
            ) : (
                <EndingCheckout />
            )}
        </Container>
    );
};

export default PaymentSwap;
