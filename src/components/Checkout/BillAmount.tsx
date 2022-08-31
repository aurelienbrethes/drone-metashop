import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import { useTranslation } from 'react-i18next';

function BillAmount(): JSX.Element {
    const { cryptoAmountDisplayed } = useCheckoutFromStore().paymentSwapInfos;
    const { t } = useTranslation();
    return (
        <>
            <p className="font-bold text-lg">{`${t(
                'checkout.billAmount',
            )} : ${cryptoAmountDisplayed}`}</p>
        </>
    );
}

export default BillAmount;
