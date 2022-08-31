import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import { useTranslation } from 'react-i18next';

interface IProps {
    setIsSwapActive: Dispatch<SetStateAction<boolean>>;
}

function SwapHeader({ setIsSwapActive }: IProps): JSX.Element {
    const { paymentNetwork } = useCheckoutFromStore();
    const { t } = useTranslation();
    return (
        <>
            <div className="flex items-center justify-between w-full">
                <h3 className="font-bold text-gray-900">
                    {t('checkout.notEnoughBalance')} ?{' '}
                    {t('checkout.swapWithOther')}
                </h3>
                <button onClick={() => setIsSwapActive(false)} type="button">
                    <Image src="/images/close.png" height={15} width={15} />
                </button>
            </div>
            {/* Replace with the current network value */}
            <p className="mt-2 mb-10 text-sm text-gray-900">
                {t('checkout.network')}:{' '}
                {`${
                    paymentNetwork && paymentNetwork !== 'rinkeby'
                        ? paymentNetwork.split('')[0].toUpperCase() +
                          paymentNetwork.slice(1)
                        : 'Ropsten'
                }`}
            </p>
        </>
    );
}

export default SwapHeader;
