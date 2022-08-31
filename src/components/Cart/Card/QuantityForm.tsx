/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useCartFromStore from '@hooks/useCartFromStore';
import cartQuantitySchema from '@utils/yup.validation.schema/cartQuantity.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from '@utils/tailwind';
import MAX_QUANTITY_PURCHASABLE from '@constants/cart.constants';

interface IProps {
    productId: number;
    variationId: number;
    itemQuantity: number;
    stockQuantity: number | null;
}

interface IFormData {
    quantity: number;
}

function QuantityForm({
    productId,
    variationId,
    itemQuantity,
    stockQuantity,
}: IProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(cartQuantitySchema()),
    });

    const { triggerDispatchUpdateQuantity } = useCartFromStore();

    const setFocusOut = () => {
        const input = document.getElementById(
            `submitInput-${variationId || productId}`,
        );
        if (input) {
            input.blur();
        }
    };

    useEffect(() => {
        setValue('quantity', itemQuantity);
    }, [itemQuantity]);

    useEffect(() => {
        if (errors && errors.quantity) {
            const value =
                errors.quantity.type === 'max'
                    ? Math.min(
                          stockQuantity || +MAX_QUANTITY_PURCHASABLE,
                          +MAX_QUANTITY_PURCHASABLE,
                      )
                    : 1;
            setValue('quantity', value);
            triggerDispatchUpdateQuantity({
                productId,
                variationId,
                quantity: value,
            });
        }
        setFocusOut();
    }, [errors]);

    const onSubmit = ({ quantity }: IFormData) => {
        setValue(
            'quantity',
            stockQuantity
                ? Math.min(+MAX_QUANTITY_PURCHASABLE, quantity, stockQuantity)
                : Math.min(+MAX_QUANTITY_PURCHASABLE, quantity),
        );
        triggerDispatchUpdateQuantity({
            productId,
            variationId,
            quantity,
        });
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <form
            id={`quantity-form-${variationId || productId}`}
            onSubmit={(e) => e.preventDefault()}
            className={classNames(
                `  flex w-20  m-0.5 mx-2 text-xs font-medium text-gray-700 shadow-sm sm:text-xs ${
                    errors && errors.quantity
                        ? 'border-red-500'
                        : 'border-gray-300'
                }`,
            )}
        >
            <input
                id={`submitInput-${variationId || productId}`}
                {...register('quantity', {
                    valueAsNumber: true,
                })}
                onBlur={handleSubmit(onSubmit)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit(onSubmit);
                        setFocusOut();
                    }
                }}
                className={classNames(
                    `w-full p-1.5 text-center rounded-md border border-gray-400 focus:outline-blue-500 ${
                        errors.quantity ? 'bg-red-200' : 'bg-white'
                    }`,
                )}
            />
        </form>
    );
}

export default QuantityForm;
