import React from 'react';
import Button from '@components/UI/Button';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import { getPaymentChainId } from '@utils/paraswap.utils';
import { useMetaMask } from 'metamask-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface IProps {
    className?: string;
}

function SwitchNetworkBanner({ className }: IProps): JSX.Element {
    const { paymentNetwork } = useCheckoutFromStore();
    const { chainId, ethereum } = useMetaMask();
    const { t } = useTranslation();

    const handleClick = async (newNetworkId: string) => {
        try {
            const paymentChainId = `0x${getPaymentChainId(
                newNetworkId,
            ).toString(16)}`;

            if (!paymentChainId) throw new Error(t('checkout.invalidNetwork'));

            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: paymentChainId }],
            });
        } catch (switchError) {
            toast.error((switchError as Error).message);
        }
    };

    if (chainId && getPaymentChainId(paymentNetwork) === parseInt(chainId, 16))
        return <></>;

    return (
        <div
            className={`flex justify-center items-center bg-yellow-400 bg-opacity-60 p-2 mb-1 rounded-lg font-semibold ${
                className || ''
            }`}
        >
            {paymentNetwork ? (
                <>
                    <p>{t('checkout.badNetwork')}</p>
                    <Button
                        handleClick={() => handleClick(paymentNetwork)}
                        className="px-3 py-1 ml-2 mr-2 text-sm font-medium text-white bg-yellow-400 rounded-lg focus:outline-none hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
                    >
                        {t('checkout.changeNetwork')}
                    </Button>
                </>
            ) : (
                <p>{t('checkout.noBill')}</p>
            )}
        </div>
    );
}

export default SwitchNetworkBanner;
