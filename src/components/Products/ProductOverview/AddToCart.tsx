import React from 'react';
import Spinner from '@components/UI/Spinner';
import { useTranslation } from 'react-i18next';
import classNames from '@utils/tailwind';

interface IProps {
    isLoading: boolean;
    disabled: boolean;
    handleClick: () => void;
}

function AddToCart({ handleClick, isLoading, disabled }: IProps): JSX.Element {
    const { t } = useTranslation();
    const buttonText = !disabled
        ? t('productOverview.buttonAddToCartLabel')
        : t('productOverview.outOfStock');

    return (
        <div className="flex mt-10 sm:flex-col1">
            <button
                type="button"
                onClick={handleClick}
                className={classNames(`${
                    disabled
                        ? 'border-gray text-gray-400'
                        : 'border-black text-black hover:bg-gray-50'
                }
                    max-w-xs flex-1 border rounded-md py-3 px-8 flex items-center justify-center text-base font-light focus:outline-none sm:w-full`)}
                disabled={disabled}
            >
                {!isLoading ? buttonText : <Spinner width="6" />}
            </button>
        </div>
    );
}

export default AddToCart;
