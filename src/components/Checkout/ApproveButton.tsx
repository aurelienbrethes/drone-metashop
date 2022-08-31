import { ReactElement, useState } from 'react';
import Button from '@components/UI/Button';
import { providers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { toast } from 'react-toastify';
import Spinner from '@components/UI/Spinner';
import CustomToast from '@components/Toats/CustomToast';
import { useTranslation } from 'react-i18next';

interface IProps {
    spenderAddress: string | null;
    tokenContractAddress: string | null;
    enabled?: boolean;
    endHandler: () => void;
    amount: number;
    approveHandler: (
        windowEthereum: providers.ExternalProvider,
        tokenContractAddress: string,
        spenderContractAddress: string,
        amount: number,
        waitForTx?: boolean,
    ) => Promise<string>;
    className: string;
}

export default function ApproveButton({
    spenderAddress,
    tokenContractAddress,
    endHandler,
    amount,
    enabled,
    approveHandler,
    className,
}: IProps): ReactElement {
    const [isApproving, setIsApproving] = useState(false);
    const { ethereum: windowEthereum, account: userAddress } = useMetaMask();
    const { t } = useTranslation();

    const handleApprove = async (): Promise<void> => {
        setIsApproving(true);
        try {
            if (
                !userAddress ||
                !spenderAddress ||
                !windowEthereum ||
                !tokenContractAddress
            )
                throw new Error('Missing informations to approve');

            await approveHandler(
                windowEthereum,
                tokenContractAddress,
                spenderAddress,
                amount * 100, // token amount we want to approve without decimals
                true,
            );
            endHandler();
        } catch (e) {
            toast.error(<CustomToast message={(e as Error).message} />);
        } finally {
            setIsApproving(false);
        }
    };

    return (
        <Button
            handleClick={handleApprove}
            className={className}
            disabled={isApproving || !enabled}
        >
            {isApproving ? (
                <Spinner width="6" />
            ) : (
                <>{t('checkout.approveBtnLbl')}</>
            )}
        </Button>
    );
}
