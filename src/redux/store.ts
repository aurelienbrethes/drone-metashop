import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { loadCartState } from './persist/localStorage';

import rootReducer from './reducer';

const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        cart: loadCartState(),
    },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch();

export default store;
