import ErrorBoundary from '@components/Error/ErrorBoundary';
import PaymentErrorFallback from '@components/Error/PaymentErrorFallback';
import React, { ReactElement } from 'react';
import { getTruncatedString } from '@utils/shop.utils';
import { useMetaMask } from 'metamask-react';
import Button from '@components/UI/Button';
import { useTranslation } from 'react-i18next';

interface IProps {
    children: ReactElement;
}

function Container({ children }: IProps) {
    const { account, connect } = useMetaMask();
    const { t } = useTranslation();
    return (
        <ErrorBoundary ErrorFallback={PaymentErrorFallback}>
            <div className="flex justify-end w-full">
                <Button
                    className="flex overflow-hidden text-xs rounded-full"
                    disabled={!!account}
                    handleClick={connect}
                >
                    <p className="p-2 text-white bg-black min-w-34">
                        {account
                            ? `${t('checkout.connectedAccount')}`
                            : `${t('checkout.connect')}`}
                    </p>
                    {account && (
                        <div className="flex items-center px-2 bg-gray-200">
                            {account
                                ? `${getTruncatedString(account, 5)}`
                                : '...'}
                        </div>
                    )}
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center w-full px-2 py-10 align-middle lg:px-0">
                {children}
            </div>
        </ErrorBoundary>
    );
}

export default Container;
