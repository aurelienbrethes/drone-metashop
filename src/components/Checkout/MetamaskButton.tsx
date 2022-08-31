/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import Button from '@components/UI/Button';
import Text from '@components/UI/Text';
import { useMetaMask } from 'metamask-react';
import { useTranslation } from 'react-i18next';
import classNames from '@utils/tailwind';

interface IProps {
    handleClick: () => void;
    disabled?: boolean;
}

export default function MetamaskButton({
    handleClick,
    disabled,
}: IProps): ReactElement {
    const { status, connect } = useMetaMask();
    const { t } = useTranslation();

    if (status === 'initializing')
        return <Text text={t('metamask.synchronisation')} />;

    if (status === 'unavailable')
        return <span>{t('metamask.unavailable')}</span>;

    if (status === 'notConnected')
        return (
            <Button
                className="w-full px-4 py-2 mt-3 font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 bg-blue-sapphire hover:bg-indigo-dye"
                handleClick={connect}
            >
                {t('metamask.connect')}
            </Button>
        );

    if (status === 'connecting')
        return (
            <Button
                className="w-full px-4 py-2 mt-3 font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 bg-blue-sapphire hover:bg-indigo-dye"
                handleClick={connect}
            >
                {t('metamask.connecting')}
            </Button>
        );

    return (
        <Button
            disabled={!!disabled}
            handleClick={handleClick}
            className={classNames(
                ` mt-3 w-full rounded-md px-4 shadow-sm py-2 font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    !disabled
                        ? `text-white focus:ring-blue-900 bg-blue-sapphire hover:bg-indigo-dye`
                        : `text-gray-400 bg-gray-200`
                }`,
            )}
        >
            {t('payment.payWithMetamask')}
        </Button>
    );
}
