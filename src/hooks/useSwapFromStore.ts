import { RootState } from '@redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    setDestToken,
    setSrcToken,
    setSwapSide,
    resetSwapState,
    setSwapCustomerBalance,
} from '@redux/actions';
import { SwapSide } from '@src/interfaces/paraswap';

const useSwapFromStore = () => {
    const dispatch = useDispatch();

    const { srcToken, destToken, side, customerSwapBalance } = useSelector(
        (state: RootState) => state.swap,
    );

    const triggerDispatchSrcToken = (payload: IToken) =>
        dispatch(setSrcToken(payload));

    const triggerDispatchDestToken = (payload: IToken) =>
        dispatch(setDestToken(payload));

    const triggerDispatchSwapSide = (payload: SwapSide) =>
        dispatch(setSwapSide(payload));

    const triggerDispatchSwapCustomerBalance = (payload: number) =>
        dispatch(setSwapCustomerBalance(payload));

    const triggerDispatchResetSwapState = () => dispatch(resetSwapState());

    return {
        srcToken,
        destToken,
        side,
        customerSwapBalance,
        triggerDispatchSrcToken,
        triggerDispatchDestToken,
        triggerDispatchSwapSide,
        triggerDispatchSwapCustomerBalance,
        triggerDispatchResetSwapState,
    };
};

export default useSwapFromStore;
