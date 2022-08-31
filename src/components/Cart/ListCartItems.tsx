import Text from '@components/UI/Text';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import CartItemCard from './Card';

interface IProps {
    cartItems: CartItem[];
}

export default function ListCartItems({ cartItems }: IProps): ReactElement {
    const { t } = useTranslation();
    return (
        <ul className="h-full p-2 overflow-y-auto border-b border-gray-200 divide-y divide-gray-200 scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-200">
            {cartItems.length ? (
                cartItems.map((item) => (
                    <CartItemCard
                        key={item.variationId || item.productId}
                        item={item}
                    />
                ))
            ) : (
                <Text
                    className="w-full my-4 text-center text-zinc-300 "
                    text={t('cart.noItem')}
                />
            )}
        </ul>
    );
}
