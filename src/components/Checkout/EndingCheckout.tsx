/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import Button from '@components/UI/Button';
import Text from '@components/UI/Text';
import FlexContainer from '@components/UI/FlexContainer';
import useCheckoutFromStore from '@hooks/useCheckoutFromStore';
import useAppState from '@hooks/useAppState';

function EndingCheckout() {
    const router = useRouter();
    const { t } = useTranslation();
    const { dispatchResetApp } = useAppState();
    const { buyerInfos, dispatchResetCheckout } = useCheckoutFromStore();

    useEffect(
        () => () => {
            dispatchResetCheckout();
            dispatchResetApp();
        },
        [],
    );

    return (
        <FlexContainer
            direction="flex-col"
            justify="justify-center"
            className="w-full"
        >
            <Text
                text={t('checkout.success')}
                className="py-2 mb-2 text-center text-white"
            />
            <Text
                text={buyerInfos?.email || ''}
                className="font-bold text-center text-white"
            />
            <FlexContainer
                direction="flex-row"
                justify="justify-start"
                className="w-full"
            >
                <Button
                    handleClick={() => router.push('/')}
                    className="px-4 py-2 mt-10 font-medium text-white rounded-md shadow-sm lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                    {t('checkout.backShopping')}
                </Button>
            </FlexContainer>
        </FlexContainer>
    );
}

export default EndingCheckout;
