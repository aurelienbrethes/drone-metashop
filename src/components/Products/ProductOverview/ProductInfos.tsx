import SubTitle from '@components/UI/SubTitle';
import { useTranslation } from 'react-i18next';
import React from 'react';
import WooProductDescriptionParser from '@components/WooCommerceParsers/WooProductDescriptionParser';
import ProductStockQuantity from './ProductStockQuantity';

interface IProps {
    price: string;
    name: string;
    shortDescription: string;
    quantityInStock?: number;
    managedStock: boolean;
}

function ProductInfos({
    name,
    price,
    shortDescription,
    quantityInStock,
    managedStock,
}: IProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                {name}
            </h1>

            <div className="mt-3">
                <SubTitle heading="h2" className="sr-only">
                    {t('productInfo.productTitle')}
                </SubTitle>
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-900">
                    {price}
                </p>
            </div>
            <div className="mt-6 text-base lg:text-xl">
                <SubTitle heading="h3" className="sr-only">
                    {t('productInfo.descTitle')}
                </SubTitle>
                <WooProductDescriptionParser content={shortDescription} />
            </div>
            {managedStock && (
                <ProductStockQuantity quantityInStock={quantityInStock || 0} />
            )}
        </>
    );
}

export default ProductInfos;
