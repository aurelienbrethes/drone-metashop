import { combineReducers } from 'redux';
import cart from './slices/cart';
import checkout from './slices/checkout';
import app from './slices/app';
import invoices from './slices/invoices';
import swap from './slices/swap';

const rootReducer = combineReducers({
    cart,
    app,
    checkout,
    invoices,
    swap,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
