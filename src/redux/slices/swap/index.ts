/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { genericIcon } from '@constants/cryptoIcons.constants';
import { SwapSide } from '@src/interfaces/paraswap';

import i18n from '../../../../i18n';

type SwapState = {
    srcToken: IToken;
    destToken: IToken;
    side: SwapSide;
    customerSwapBalance: number;
};

const initialToken: IToken = {
    address: '',
    decimals: 0,
    symbol: i18n.t('checkout.chooseToken'),
    name: '',
    chainId: 0,
    logoURI: genericIcon.src,
};

const initialState: SwapState = {
    srcToken: initialToken,
    destToken: initialToken,
    side: SwapSide.SELL,
    customerSwapBalance: 0,
};

const swapSlice = createSlice({
    name: 'swapState',
    initialState,
    reducers: {
        setSrcToken: (state, action: PayloadAction<IToken>) => {
            state.srcToken = action.payload;
        },
        setDestToken: (state, action: PayloadAction<IToken>) => {
            state.destToken = action.payload;
        },
        setSwapSide: (state, action: PayloadAction<SwapSide>) => {
            state.side = action.payload;
        },
        setSwapCustomerBalance: (state, action: PayloadAction<number>) => {
            state.customerSwapBalance = action.payload;
        },
        resetSwapState: () => initialState,
    },
});

export const {
    setSrcToken,
    setDestToken,
    setSwapSide,
    resetSwapState,
    setSwapCustomerBalance,
} = swapSlice.actions;

export default swapSlice.reducer;
