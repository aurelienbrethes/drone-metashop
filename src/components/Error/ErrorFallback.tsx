import React from 'react';
import { useTranslation } from 'react-i18next';

const ErrorFallback = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full h-screen font-extrabold">
            {t('errorFallback.unknown_error')}
        </div>
    );
};
export default ErrorFallback;
