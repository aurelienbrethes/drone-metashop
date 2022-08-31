import { RootState } from '@redux/reducer';
import { createSelector } from '@reduxjs/toolkit';

const cartState = (state: RootState) => state.cart;

export const totalPriceSelector = createSelector(cartState, (items) =>
    items
        .reduce(
            (total, current) => total + +current.price * current.quantity,
            0,
        )
        .toFixed(2),
);

export const totalItemsInCartSelector = createSelector(cartState, (cartItems) =>
    cartItems.reduce((items, curr) => items + curr.quantity, 0),
);

interface CartItemReducedWithQuantity extends CartItem {
    quantity: number;
}

export const quantityReducerSelector = createSelector(cartState, (cartItems) =>
    cartItems.reduce((items: CartItemReducedWithQuantity[], curr: CartItem) => {
        const index = items.findIndex((i) =>
            i.variationId
                ? curr.variationId === i.variationId
                : i.productId === curr.productId,
        );

        if (index !== -1) {
            const draftItem = items[index];

            const arrayWithoutDraftItem = items.filter(
                (item) =>
                    (item.variationId &&
                        item.variationId !== curr.variationId) ||
                    item.productId !== curr.productId,
            );

            return [
                ...arrayWithoutDraftItem,
                { ...draftItem, quantity: draftItem.quantity + 1 },
            ];
        }

        return [...items, { ...curr, quantity: 1 }];
    }, []),
);

export const combineSelectors = createSelector(
    cartState,
    quantityReducerSelector,
    (_, previous) => previous,
);
