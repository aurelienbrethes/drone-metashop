import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentErrorFallback = () => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-screen font-extrabold">
            {t('errorFallback.payment_error')}
        </div>
    );
};
export default PaymentErrorFallback;
