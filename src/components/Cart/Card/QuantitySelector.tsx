import Button from '@components/UI/Button';
import React, { ReactElement } from 'react';
import FlexContainer from '@components/UI/FlexContainer';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import useCartFromStore from '@hooks/useCartFromStore';
import className from '@utils/tailwind/index';
import { isItemInStorePurchasable } from '@src/hooks/utils';
import QuantityForm from './QuantityForm';

interface IProps {
    item: CartItem;
}

export default function QuantitySelector({ item }: IProps): ReactElement {
    const {
        triggerDispatchDecreaseQuantity,
        triggerDispatchIncreaseQuantity,
        cartItems,
    } = useCartFromStore();

    return (
        <FlexContainer
            justify="justify-start"
            direction="flex-row"
            className=" items-center align-middle"
        >
            <Button
                disabled={
                    item.quantity <= 1 &&
                    !isItemInStorePurchasable({ cartItems, item })
                }
                handleClick={() =>
                    triggerDispatchDecreaseQuantity({
                        productId: item.productId,
                        variationId: item.variationId,
                    })
                }
                className={className(
                    `${
                        item.quantity <= 1 ? 'bg-gray-500' : 'bg-blue-600'
                    } rounded-sm p-0.5 text-white`,
                )}
            >
                <MinusIcon width={12} height={12} />
            </Button>
            <QuantityForm
                productId={item.productId}
                variationId={item.variationId}
                itemQuantity={item.quantity}
                stockQuantity={item.stockQuantity}
            />
            <Button
                disabled={!isItemInStorePurchasable({ cartItems, item })}
                handleClick={() =>
                    triggerDispatchIncreaseQuantity({
                        productId: item.productId,
                        variationId: item.variationId,
                    })
                }
                className={className(
                    `${
                        !isItemInStorePurchasable({ cartItems, item })
                            ? 'bg-gray-500'
                            : 'bg-blue-600'
                    } rounded-sm p-0.5 text-white`,
                )}
            >
                <PlusIcon width={12} height={12} />
            </Button>
        </FlexContainer>
    );
}
