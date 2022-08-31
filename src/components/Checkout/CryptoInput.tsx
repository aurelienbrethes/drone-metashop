import React from 'react';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { swapFetcher } from '@fetcher/next-api.fetcher';
import { useTranslation } from 'react-i18next';
import { TokenRateResponse } from '@src/interfaces/swap-payment';
import { AxiosError } from 'axios';
import { IError } from '@src/interfaces/api';
import { SwapSide } from '@src/interfaces/paraswap';
import { useMetaMask } from 'metamask-react';
import getTokensList from '@utils/paraswap.utils';
import CustomToast from '@components/Toats/CustomToast';
import CryptoSelector from './CryptoSelector';

function CryptoInput(): JSX.Element {
    const { t } = useTranslation();

    const {
        paymentNetwork,
        cryptoSelected,
        paymentSwapInfos: {
            cryptoAmount,
            paymentCurrencyToken,
            paymentCurrencyDecimals,
        },
        dispatchCryptoSelected,
    } = useCheckoutFromStore();

    const { account } = useMetaMask();
    const { data: tokenRateData } = useQuery<
        TokenRateResponse,
        AxiosError<IError>
    >(
        ['pay', account, cryptoSelected.address, 'tokenRate'],
        () =>
            swapFetcher.findTokenRate({
                srcToken: cryptoSelected.address,
                srcDecimals: cryptoSelected.decimals,
                destToken: paymentCurrencyToken,
                destDecimals: paymentCurrencyDecimals,
                amount: cryptoAmount,
                side: SwapSide.BUY,
                network: cryptoSelected.chainId, // in decimal base not hexa base
                userAddress: account as string,
                mode: 'transfer',
            }),
        {
            enabled:
                !!cryptoSelected.address &&
                !!account &&
                !!cryptoAmount &&
                cryptoSelected.symbol !== 'jEUR',
            onError: () => {
                toast.error(<CustomToast message={t('payment.noLiquidity')} />);
            },
            retry: false,
        },
    );

    return (
        <div className="flex items-center justify-between w-full p-2 mb-2 border border-white rounded-md">
            <CryptoSelector
                tokensList={getTokensList(
                    paymentNetwork.toLowerCase(),
                    'accepted',
                )}
                tokenSelected={cryptoSelected}
                setTokenSelected={dispatchCryptoSelected}
            />
            <p>
                {tokenRateData &&
                    +tokenRateData?.optimalRate?.srcAmount /
                        10 ** cryptoSelected.decimals}
            </p>
        </div>
    );
}

export default CryptoInput;
