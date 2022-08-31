import { useQuery } from 'react-query';
import { useMetaMask } from 'metamask-react';
import { getWalletBalance } from '@matthias_wanner/web3_utils';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import useSwapFromStore from '@src/hooks/useSwapFromStore';
import CustomToast from '@components/Toats/CustomToast';
import classNames from '@utils/tailwind';

interface IProps {
    tokenInfos: IToken;
    mode: 'swap' | 'pay';
    className?: string;
}

function CurrencyBalance({ tokenInfos, mode, className }: IProps) {
    const [isGoodNetwork, setIsGoodNetwork] = useState(false);
    const { dispatchCheckoutCustomerBalance } = useCheckoutFromStore();
    const { triggerDispatchSwapCustomerBalance } = useSwapFromStore();
    const { account, ethereum: windowEthereum, chainId } = useMetaMask();
    const { t } = useTranslation();

    const { data: balanceDatas } = useQuery(
        ['balance', account, chainId, tokenInfos.address],
        () => {
            if (mode === 'swap') {
                triggerDispatchSwapCustomerBalance(0);
            } else {
                dispatchCheckoutCustomerBalance(0);
            }
            return getWalletBalance({
                contractAddress: tokenInfos.address,
                windowEthereum,
                contractType: 'erc20',
            });
        },
        {
            enabled:
                !!tokenInfos.address &&
                !!account &&
                !!windowEthereum &&
                isGoodNetwork,

            onSuccess: (response) => {
                if (mode === 'pay')
                    return dispatchCheckoutCustomerBalance(
                        +response.balance * 10 ** tokenInfos.decimals,
                    );
                return triggerDispatchSwapCustomerBalance(
                    +response.balance * 10 ** tokenInfos.decimals,
                );
            },
            onError: (err) => {
                toast.error(<CustomToast message={(err as Error).message} />);
            },
        },
    );

    useEffect(() => {
        setIsGoodNetwork(parseInt(chainId || '0', 16) === tokenInfos.chainId);
    }, [chainId, tokenInfos.chainId]);

    return (
        <div className={classNames(`w-full text-sm mb-5 ${className || ''}`)}>
            {balanceDatas ? (
                <p>{`${t('checkout.yourBalance')} : ${balanceDatas.balance} ${
                    balanceDatas.symbol
                }`}</p>
            ) : (
                <></>
            )}
        </div>
    );
}

export default CurrencyBalance;
