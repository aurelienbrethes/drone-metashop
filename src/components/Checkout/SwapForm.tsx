/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSwapFromStore from '@src/hooks/useSwapFromStore';
import { IError } from '@src/interfaces/api';
import {
    SwapTransactionArgs,
    SwapTransactionResponse,
    TokenRateResponse,
} from '@src/interfaces/swap-payment';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { giveErc20Allowance } from '@matthias_wanner/web3_utils';
import { sanitizeAmount } from '@utils/prices.utils';
import classNames from '@utils/tailwind';
import { useMetaMask } from 'metamask-react';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import axios, { AxiosError } from 'axios';
import useAllowanceSate from '@src/hooks/useAllowanceState';
import { swapFetcher } from '@fetcher/next-api.fetcher';
import { toast } from 'react-toastify';
import Button from '@components/UI/Button';
import getTokensList from '@utils/paraswap.utils';
import CustomToast from '@components/Toats/CustomToast';
import CryptoSelector from './CryptoSelector';
import ApproveButton from './ApproveButton';
import CurrencyBalance from './CurrencyBalance';

function SwapForm() {
    const { account, ethereum } = useMetaMask();
    const { t } = useTranslation();

    const { register, watch, setValue, getValues } = useForm({
        defaultValues: {
            srcAmount: '0',
        },
    });
    const srcAmountValue = watch('srcAmount');

    const {
        destToken: storeDestToken,
        srcToken: storeSrcToken,
        side,
        customerSwapBalance,
        triggerDispatchDestToken,
        triggerDispatchSrcToken,
    } = useSwapFromStore();

    const { paymentNetwork } = useCheckoutFromStore();
    const { data: tokenRateData, refetch: refetchTokenRate } = useQuery<
        TokenRateResponse,
        AxiosError
    >(
        ['swap', storeDestToken.address, storeSrcToken.address, 'tokenRate'],
        () =>
            swapFetcher.findTokenRate({
                srcToken: storeSrcToken.address,
                srcDecimals: storeSrcToken.decimals,
                destToken: storeDestToken.address,
                destDecimals: storeDestToken.decimals,
                amount: +getValues('srcAmount') * 10 ** storeSrcToken.decimals, // TODO get from input form
                side,
                network: storeDestToken.chainId, // in decimal base not hexa base
                userAddress: account as string,
                mode: 'swap',
            }),
        {
            enabled:
                !!storeDestToken.address &&
                !!storeSrcToken.address &&
                !!+getValues('srcAmount'),
            onError: (error) =>
                toast.error(
                    <CustomToast message={error.response?.data.error} />,
                ),
            retry: false,
        },
    );

    const { mutateAsync: swapTransaction } = useMutation<
        SwapTransactionResponse,
        AxiosError<IError>,
        SwapTransactionArgs
    >(swapFetcher.swapPayment);

    const { isAllowed, setIsAllowed } = useAllowanceSate(
        storeSrcToken.address,
        tokenRateData?.optimalRate.tokenTransferProxy || null,
        +(tokenRateData?.optimalRate.srcAmount || '0'),
    );

    const handleSwap = async () => {
        try {
            if (!account) throw new Error(t('payment.connectMetamask'));
            if (!tokenRateData) throw new Error(t('payment.noToken'));

            const { gas, gasPrice, ...rest } = await swapTransaction({
                srcToken: storeSrcToken.address,
                srcAmount: tokenRateData.optimalRate.srcAmount,
                destToken: storeDestToken.address,
                destAmount: tokenRateData.optimalRate.destAmount,
                userAddress: account,
                networkId: storeDestToken.chainId,
                priceRoute: tokenRateData.optimalRate,
                mode: 'swap',
            });

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [rest],
            });
            return toast.success(
                <CustomToast message={t('payment.transactioSend')} />,
            );
        } catch (error) {
            if (axios.isAxiosError(error))
                return toast(
                    <CustomToast message={error.response?.data.error} />,
                );
            return toast(<CustomToast message={(error as Error).message} />);
        }
    };

    useEffect(() => {
        const srcAmountSanitized = sanitizeAmount(srcAmountValue);

        if (!Number.isNaN(+srcAmountSanitized)) {
            setValue('srcAmount', srcAmountSanitized);

            if (+srcAmountSanitized) {
                setTimeout(() => {
                    if (!!storeDestToken.address && !!storeSrcToken.address)
                        refetchTokenRate();
                }, 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [srcAmountValue]);

    return (
        <>
            <CryptoSelector
                tokensList={getTokensList(paymentNetwork.toLowerCase())}
                tokenSelected={storeSrcToken}
                setTokenSelected={triggerDispatchSrcToken}
            />
            <div className="flex w-full h-12 p-2 my-2 border border-black rounded-md">
                {/* Amount of the crypto selected from the user's wallet */}
                <input
                    className="flex items-center justify-between w-full p-2 bg-transparent border-0 focus:border-none focus:ring-0"
                    type="text"
                    required
                    {...register('srcAmount')}
                />
                <Button
                    className="flex items-center justify-center p-2 border border-black rounded-md hover:bg-gray-200 text-gray-900"
                    disabled={!customerSwapBalance}
                    handleClick={() =>
                        setValue(
                            'srcAmount',
                            `${
                                customerSwapBalance /
                                10 ** storeSrcToken.decimals
                            }`,
                        )
                    }
                >
                    Max
                </Button>
            </div>
            <CurrencyBalance
                mode="swap"
                tokenInfos={storeSrcToken}
                className="text-gray-900"
            />
            {customerSwapBalance <
                +(tokenRateData?.optimalRate.srcAmount || '0') && (
                <span className="w-full text-red-400">
                    {t('checkout.notEnoughBalance')}
                </span>
            )}
            <CryptoSelector
                tokensList={getTokensList(
                    paymentNetwork.toLowerCase(),
                    'accepted',
                )}
                className="mt-5"
                tokenSelected={storeDestToken}
                setTokenSelected={triggerDispatchDestToken}
            />
            <div className="flex items-end justify-between w-full h-12 px-2 py-3 border border-black rounded-md mt-2">
                {/* Converstion of the amount in FAU */}
                <p className="text-gray-900">
                    {tokenRateData
                        ? +tokenRateData?.optimalRate.destAmount /
                          10 ** tokenRateData?.optimalRate.destDecimals
                        : ''}
                </p>
            </div>

            <ApproveButton
                amount={
                    (+(tokenRateData?.optimalRate.srcAmount || '0') /
                        10 ** storeSrcToken.decimals) *
                    100
                }
                approveHandler={giveErc20Allowance}
                spenderAddress={
                    tokenRateData?.optimalRate.tokenTransferProxy || null
                }
                tokenContractAddress={
                    tokenRateData?.optimalRate.srcToken || null
                }
                enabled={
                    !!account &&
                    !!tokenRateData?.optimalRate.tokenTransferProxy &&
                    !isAllowed
                }
                endHandler={() => setIsAllowed(true)}
                className={classNames(
                    `w-full mt-10 py-3 rounded-md ${
                        !!account &&
                        !!tokenRateData?.optimalRate.tokenTransferProxy &&
                        !isAllowed
                            ? 'bg-black text-white'
                            : 'text-gray-400 bg-gray-200'
                    }`,
                )}
            />
            <Button
                // onclick execute the swap
                handleClick={handleSwap}
                disabled={
                    !isAllowed ||
                    customerSwapBalance <
                        +(tokenRateData?.optimalRate.srcAmount || '0') ||
                    !+getValues('srcAmount')
                }
                className={classNames(
                    `w-full mt-3 py-3 rounded-md ${
                        !isAllowed ||
                        customerSwapBalance <
                            +(tokenRateData?.optimalRate.srcAmount || '0') ||
                        !+getValues('srcAmount')
                            ? 'text-gray-400 bg-gray-200'
                            : 'bg-black text-white'
                    }`,
                )}
                type="button"
            >
                Swap
            </Button>
        </>
    );
}

export default SwapForm;
