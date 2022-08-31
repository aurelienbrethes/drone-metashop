import Image from 'next/image';
import React, { ReactElement } from 'react';

interface Props {
    imageSrc: string;
}

export default function ProductThumbnail({ imageSrc }: Props): ReactElement {
    return (
        <div className="flex shrink-0 relative border-2 overflow-hidden w-24 h-24 rounded-md sm:w-32 sm:h-32">
            <Image
                src={imageSrc || '/images/product_placeholder.png'}
                alt="product in cart"
                priority
                placeholder="blur"
                blurDataURL="/images/product_placeholder.png"
                layout="fill"
            />
        </div>
    );
}
