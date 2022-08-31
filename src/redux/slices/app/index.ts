/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
    siteName: string;
    siteDescription: string;
    siteLogoUrl: string;
    shopNotice: string;
    isCartOpen: boolean;
    isCheckingOut: boolean;
    isAuth: boolean;
    insideModal: string;
    allProducts: Array<IMetaShopProduct>;
};

const initialState: AppState = {
    isCartOpen: false,
    isCheckingOut: false,
    isAuth: false,
    siteName: '',
    siteDescription: '',
    siteLogoUrl: '',
    shopNotice: '',
    insideModal: '',
    allProducts: [],
};

const appSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        setIsCheckingOut: (state, action) => {
            state.isCheckingOut = action.payload;
        },
        setInsideModal: (state, action) => {
            state.insideModal = action.payload;
        },
        setCartProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setSiteInfos: (
            state,
            action: PayloadAction<Omit<ISiteInfos, 'siteIconUrl' | 'siteUrl'>>,
        ) => ({
            ...state,
            ...action.payload,
        }),

        resetApp: (state) => {
            state.isCartOpen = false;
            state.isCheckingOut = false;
        },
    },
});

export const {
    toggleCart,
    resetApp,
    setAuth,
    setIsCheckingOut,
    setSiteInfos,
    setInsideModal,
    setCartProducts,
} = appSlice.actions;

export default appSlice.reducer;
