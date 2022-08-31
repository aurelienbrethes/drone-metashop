import { checkErc20Allowance } from '@matthias_wanner/web3_utils';
import { isAmountAllowed } from '@utils/paraswap.utils';
import { useMetaMask } from 'metamask-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

type ContractAddress = string | null;

const useAllowanceSate = (
    tokenAddress: ContractAddress,
    spenderAddress: ContractAddress,
    amount: number,
) => {
    const [isAllowed, setIsAllowed] = useState(false);

    const { account, ethereum: windowsEthereum, chainId } = useMetaMask();

    const { refetch } = useQuery(
        ['allowance', account, spenderAddress, tokenAddress, chainId],
        () => {
            setIsAllowed(false);
            return checkErc20Allowance(
                windowsEthereum,
                tokenAddress || '',
                spenderAddress || '',
                account || '',
            );
        },
        {
            enabled:
                !!account &&
                !!tokenAddress &&
                spenderAddress?.toLowerCase() !== account.toLowerCase() &&
                !!spenderAddress &&
                !!windowsEthereum,

            onSuccess: (res) => {
                setIsAllowed(isAmountAllowed(res, amount));
            },
        },
    );

    useEffect(() => {
        if (spenderAddress?.toLowerCase() !== (account || '').toLowerCase())
            setIsAllowed(false);
        else setIsAllowed(true);
    }, [account, spenderAddress]);

    return { isAllowed, refetch, setIsAllowed };
};

export default useAllowanceSate;
