/* eslint-disable no-console */
import { RootState } from '@redux/reducer';

const KEY = 'cart';

export function loadCartState() {
    try {
        const serializedState = localStorage.getItem(KEY);
        if (!serializedState) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
}

export async function saveCartState(state: RootState['cart']) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(KEY, serializedState);
    } catch (e) {
        console.log('Error saving cart state: ', e);
    }
}
