/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBuyerInfos } from '@src/interfaces/request-network';
import { IPaymentSwapInfos } from '@src/interfaces/swap-payment';
import { genericIcon } from '@src/constants/cryptoIcons.constants';
import i18n from '../../../../i18n';

type CheckoutState = {
    orderId: number;
    isAwaitingRequest: boolean;
    isPaying: boolean;
    isPayed: boolean;
    checkoutMessage: string;
    buyerInfos: IBuyerInfos | null;
    customerCheckoutBalance: number;
    cryptoSelected: IToken;
    paymentSwapInfos: IPaymentSwapInfos;
    paymentNetwork: string;
};

const initialToken: IToken = {
    address: '',
    name: '',
    logoURI: genericIcon.src,
    chainId: 0,
    decimals: 0,
    symbol: i18n.t('checkout.chooseToken'),
};

const initialState: CheckoutState = {
    orderId: 0,
    isAwaitingRequest: false,
    isPaying: false,
    isPayed: false,
    checkoutMessage: '',
    buyerInfos: null,
    customerCheckoutBalance: 0,
    cryptoSelected: initialToken,
    paymentSwapInfos: {
        cryptoAmount: 0,
        cryptoAmountDisplayed: '',
        paymentCurrencyToken: '',
        paymentCurrencyDecimals: 0,
    },
    paymentNetwork: '',
};

const checkoutSlice = createSlice({
    name: 'checkoutState',
    initialState,
    reducers: {
        setOrderId: (state, action: PayloadAction<number>) => {
            state.orderId = action.payload;
        },
        setIsAwaitingRequest: (state, action: PayloadAction<boolean>) => {
            state.isAwaitingRequest = action.payload;
        },
        setIsPaying: (state, action: PayloadAction<boolean>) => {
            state.isPaying = action.payload;
        },
        setIsPayed: (state, action: PayloadAction<boolean>) => {
            state.isPayed = action.payload;
        },
        setCheckoutMessage: (state, action: PayloadAction<string>) => {
            state.checkoutMessage = action.payload;
        },

        resetCheckout: () => initialState,
        setBuyerInfos: (state, action: PayloadAction<IBuyerInfos>) => {
            state.buyerInfos = action.payload;
        },

        setCheckoutCustomerBalance: (state, action: PayloadAction<number>) => {
            state.customerCheckoutBalance = action.payload;
        },
        setPaymentSwapInfos: (
            state,
            action: PayloadAction<IPaymentSwapInfos>,
        ) => {
            state.paymentSwapInfos = action.payload;
        },
        setPaymentNetwork: (state, action: PayloadAction<string>) => {
            state.paymentNetwork = action.payload;
        },
        setCryptoSelected: (state, action: PayloadAction<IToken>) => {
            state.cryptoSelected = action.payload;
        },
    },
});

export const {
    setOrderId,
    setIsAwaitingRequest,
    setIsPaying,
    setIsPayed,
    resetCheckout,
    setBuyerInfos,
    setCheckoutMessage,
    setCheckoutCustomerBalance,
    setPaymentSwapInfos,
    setPaymentNetwork,
    setCryptoSelected,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
