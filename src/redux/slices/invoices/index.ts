/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type HistoryItem = {
    invoiceId: string;
    orderId: number;
    currencyDecimals: number;
};

type InvoicesState = {
    historyItems: HistoryItem[];
};

const initialValue = (): Omit<HistoryItem, 'currencyDecimals'>[] => {
    if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem('invoiceId');
        return item ? JSON.parse(item) : [];
    }
    return [];
};

const initialState: InvoicesState = {
    historyItems: initialValue().map((item) => ({
        ...item,
        currencyDecimals: 2,
    })),
};

const invoicesSlice = createSlice({
    name: 'invoicesState',
    initialState,
    reducers: {
        setHistoryItems: (
            state,
            action: PayloadAction<Omit<HistoryItem, 'currencyDecimals'>[]>,
        ) => ({
            ...state,
            historyItems: action.payload.map((item) => ({
                ...item,
                currencyDecimals: 2,
            })),
        }),
        addInvoiceId: (state, action) => {
            const index = state.historyItems.findIndex(
                (item) => item.invoiceId === action.payload,
            );
            if (index === -1) {
                state.historyItems.push(action.payload);
            }
        },
        removeInvoiceId: (state, action) => {
            const index = state.historyItems.findIndex(
                (item) => item.invoiceId === action.payload,
            );
            if (index !== -1) {
                state.historyItems.splice(index, 1);
            }
        },
        reset: () => initialState,
        setHistoryItemCurrencyDecimals: (
            state,
            action: PayloadAction<{ invoiceId: string; decimals: number }>,
        ) => {
            const { invoiceId, decimals } = action.payload;
            const index = state.historyItems.findIndex(
                (historyItem) =>
                    historyItem.invoiceId.toLowerCase() ===
                    invoiceId.toLowerCase(),
            );
            if (index !== -1)
                state.historyItems[index].currencyDecimals = decimals;
        },
    },
});

export const {
    setHistoryItems,
    setHistoryItemCurrencyDecimals,
    addInvoiceId,
    removeInvoiceId,
    reset,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
