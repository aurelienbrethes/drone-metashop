import Spinner from '@components/UI/Spinner';
import Text from '@components/UI/Text';
import COLORS from '@constants/spinner.colors.constants';
import { useTranslation } from 'react-i18next';

interface IProps {
    isPaying?: boolean;
}

export default function AwaitingRequest({ isPaying }: IProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen -m-20 text-center text-white">
            <Spinner
                text={
                    isPaying
                        ? `${t('checkout.awaitingPayment')}`
                        : `${t('checkout.awaitingInvoicing')}`
                }
                spinnerColor={COLORS.WHITE}
            />
            {isPaying && (
                <Text
                    text={t('checkout.transactionOnChain')}
                    className="px-4 py-12 text-white"
                />
            )}
        </div>
    );
}
