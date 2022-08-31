import React from 'react';
import { useTranslation } from 'react-i18next';
import SubTitle from '@components/UI/SubTitle';
import Text from '@components/UI/Text';

export default function OrderFormHeader(): JSX.Element {
    const { t } = useTranslation();
    return (
        <>
            <SubTitle
                heading="h3"
                className="text-lg font-medium leading-6 text-white"
            >
                {t('orderFormHeader.title')}
            </SubTitle>
            <Text
                text={t('orderFormHeader.text')}
                className="mt-1 text-sm text-white"
            />
        </>
    );
}
