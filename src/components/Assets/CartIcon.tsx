import CartPortal from '@components/Cart/CartPortal';
import Image from 'next/image';
import React, { ReactElement, useEffect } from 'react';
import useAppState from '@hooks/useAppState';
import useCartFromStore from '@hooks/useCartFromStore';
import store from '@redux/store';
import { saveCartState } from '@redux/persist/localStorage';

interface IProps {
    disabled?: boolean;
}

export default function CartIcon({ disabled }: IProps): ReactElement {
    const { totalItemsInCart } = useCartFromStore();

    const { isCartOpen, dispatchToggleCart } = useAppState();

    const handleClick = () => {
        dispatchToggleCart();
    };

    useEffect(() => {
        store.subscribe(() => saveCartState(store.getState().cart));
    }, [totalItemsInCart]);

    return (
        <>
            <button
                onClick={handleClick}
                type="button"
                className={`flex mx-4 align-middle items-center justify-center active:scale-100 ${
                    disabled && `opacity-40`
                } ${!disabled && `hover:scale-105 `}`}
                disabled={disabled}
            >
                <div className="w-5 h-5 relative md:w-6 md:h-6">
                    <Image
                        src="/icons/cart.svg"
                        layout="responsive"
                        width={22}
                        height={22}
                    />
                </div>
                <span className="mx-2 text-xl font-bold">
                    {totalItemsInCart}
                </span>
            </button>

            {isCartOpen && <CartPortal />}
        </>
    );
}
