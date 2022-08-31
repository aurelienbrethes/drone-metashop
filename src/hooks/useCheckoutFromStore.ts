import { RootState } from '@redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    setOrderId,
    setIsAwaitingRequest,
    setIsPaying,
    setIsPayed,
    setCheckoutMessage,
    setBuyerInfos,
    resetCheckout,
    setCheckoutCustomerBalance,
    setPaymentSwapInfos,
    setPaymentNetwork,
    setCryptoSelected,
} from '@redux/actions';
import { IBuyerInfos } from '@src/interfaces/request-network';
import { IPaymentSwapInfos } from '@src/interfaces/swap-payment';

const useCheckoutFromStore = () => {
    const dispatch = useDispatch();

    const {
        isAwaitingRequest,
        isPaying,
        buyerInfos,
        checkoutMessage,
        paymentSwapInfos,
        isPayed,
        orderId,
        customerCheckoutBalance,
        paymentNetwork,
        cryptoSelected,
    } = useSelector((state: RootState) => state.checkout);

    const dispatchOrderId = (payload: number) => {
        dispatch(setOrderId(payload));
    };

    const dispatchIsAwaitingRequest = (payload: boolean) => {
        dispatch(setIsAwaitingRequest(payload));
    };

    const dispatchIsPaying = (payload: boolean) => {
        dispatch(setIsPaying(payload));
    };

    const dispatchIsPayed = (payload: boolean) => {
        dispatch(setIsPayed(payload));
    };

    const dispatchCheckoutMessage = (payload: string) => {
        dispatch(setCheckoutMessage(payload));
    };

    const dispatchSetPaymentSwapInfos = (
        payload: Partial<IPaymentSwapInfos>,
    ) => {
        dispatch(
            setPaymentSwapInfos({
                ...paymentSwapInfos,
                ...payload,
            }),
        );
    };

    const dispatchResetCheckout = () => dispatch(resetCheckout());

    const dispatchBuyerInfos = (payload: IBuyerInfos) =>
        dispatch(setBuyerInfos(payload));

    const dispatchCheckoutCustomerBalance = (payload: number) =>
        dispatch(setCheckoutCustomerBalance(payload));

    const dispatchPaymentNetwork = (payload: string) =>
        dispatch(setPaymentNetwork(payload));

    const dispatchCryptoSelected = (payload: IToken) =>
        dispatch(setCryptoSelected(payload));

    return {
        orderId,
        dispatchOrderId,
        isAwaitingRequest,
        dispatchIsAwaitingRequest,
        isPaying,
        isPayed,
        checkoutMessage,
        dispatchIsPaying,
        dispatchIsPayed,
        dispatchCheckoutMessage,
        dispatchResetCheckout,
        buyerInfos,
        dispatchBuyerInfos,
        customerCheckoutBalance,
        dispatchCheckoutCustomerBalance,
        paymentSwapInfos,
        dispatchSetPaymentSwapInfos,
        paymentNetwork,
        dispatchPaymentNetwork,
        cryptoSelected,
        dispatchCryptoSelected,
    };
};

export default useCheckoutFromStore;
