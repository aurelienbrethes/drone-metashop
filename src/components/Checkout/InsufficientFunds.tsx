import React from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
    tokenInfos: IToken;
    className?: string;
}

function InsufficientFunds({ tokenInfos, className }: IProps) {
    const { t } = useTranslation();
    return (
        <p className={`w-full text-red-400 ${className || ''}`}>
            {t('checkout.notEnoughBalanceMessage')} {t('checkout.makeSwapPre')}
            {` ${tokenInfos.symbol} `}
            {t('checkout.makeSwapPost')}{' '}
        </p>
    );
}

export default InsufficientFunds;
