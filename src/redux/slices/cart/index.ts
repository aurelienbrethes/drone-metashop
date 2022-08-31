/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
    name: 'cartState',
    initialState,
    reducers: {
        increaseQuantity: (
            state,
            { payload }: PayloadAction<UpdtateCartItemPayload>,
        ) => {
            const itemInCartIndex = state.findIndex((item) =>
                payload.variationId
                    ? item.variationId === payload.variationId
                    : item.productId === payload.productId,
            );

            if (itemInCartIndex !== -1) state[itemInCartIndex].quantity += 1;
        },

        decreaseQuantity: (
            state,
            { payload }: PayloadAction<UpdtateCartItemPayload>,
        ) => {
            const itemInCartIndex = state.findIndex((item) =>
                payload.variationId
                    ? item.variationId === payload.variationId
                    : item.productId === payload.productId,
            );

            if (itemInCartIndex !== -1) state[itemInCartIndex].quantity -= 1;
        },

        addItem: (state, action: PayloadAction<CartItemPayload>) => {
            state.push({ ...action.payload, quantity: 1 });
        },

        removeItem: (
            state,
            { payload }: PayloadAction<UpdtateCartItemPayload>,
        ) => [
            ...state.filter((item) =>
                payload.variationId
                    ? item.variationId !== payload.variationId
                    : item.productId !== payload.productId,
            ),
        ],

        empty: () => initialState,

        updateQuantity: (
            state,
            action: PayloadAction<UpdateCartItemQuantityPayload>,
        ) => {
            const { productId, variationId, quantity } = action.payload;
            const itemInCartIndex = state.findIndex((item) =>
                variationId
                    ? item.variationId === variationId
                    : item.productId === productId,
            );
            if (itemInCartIndex !== -1)
                state[itemInCartIndex].quantity = quantity;
        },
    },
});

export const {
    addItem,
    removeItem,
    empty,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
