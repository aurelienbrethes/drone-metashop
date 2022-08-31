import classNames from '@utils/tailwind';
import { useTranslation } from 'react-i18next';
import React, { ReactElement } from 'react';
import ProductCard from './ProductCard';

interface IProps {
    products: IMetaShopProduct[];
}

export default function ProductGrid({ products }: IProps): ReactElement {
    const { t } = useTranslation();
    return (
        <div
            aria-labelledby="products-heading"
            className="px-2 mx-auto overflow-hidden lg:px-0"
        >
            <div
                className={classNames(
                    `border-l border-t border-gray-200 grid ${
                        products.length < 2
                            ? `grid-cols-${products.length}`
                            : `grid-cols-2`
                    } ${
                        products.length < 3
                            ? `md:grid-cols-${products.length}`
                            : `md:grid-cols-3`
                    } ${
                        products.length < 4
                            ? `lg:grid-cols-${products.length}`
                            : `lg:grid-cols-4`
                    }`,
                )}
            >
                {products.length ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <span>{t('noProduct')}</span>
                )}
            </div>
        </div>
    );
}
