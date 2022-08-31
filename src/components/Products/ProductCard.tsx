import React, { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubTitle from '@components/UI/SubTitle';
import usePrices from '@hooks/usePrices';
import { getCategorySlug } from '@utils/shop.utils';

interface IProps {
    product: IMetaShopProduct;
}

export default function ProductCard({ product }: IProps): ReactElement {
    const { displayedPrice, priceBrackets } = usePrices(
        product.price,
        product.taxClass,
        product.minPrice,
        product.maxPrice,
    );
    const imageUrl = product.images.length
        ? product.images[0].src
        : '/images/product_placeholder.png';

    return (
        <div className="relative p-4 border-b border-r group sm:p-6">
            <div className="overflow-hidden bg-gray-200 rounded-lg aspect-w-4 aspect-h-5 md:group-hover:opacity-75">
                <Image
                    placeholder="blur"
                    blurDataURL={imageUrl}
                    src={imageUrl}
                    layout="fill"
                />
            </div>
            <div className="pt-10 pb-4 text-center">
                <SubTitle
                    heading="h3"
                    className="text-sm font-medium text-gray-900 md:text-base lg:text-lg"
                >
                    <Link
                        href={`/shop/${getCategorySlug(product)}/${
                            product.slug
                        }`}
                        passHref
                    >
                        <a href="replace">
                            <span
                                aria-hidden="true"
                                className="absolute inset-0"
                            />
                            {product.name}
                        </a>
                    </Link>
                </SubTitle>

                <p className="mt-4 text-base font-medium text-gray-900">
                    {priceBrackets || displayedPrice}
                </p>
            </div>
        </div>
    );
}
