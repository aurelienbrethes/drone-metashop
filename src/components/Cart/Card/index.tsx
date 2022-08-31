import Button from '@components/UI/Button';
import SubTitle from '@components/UI/SubTitle';
import React, { ReactElement } from 'react';
import FlexContainer from '@components/UI/FlexContainer';
import useCartFromStore from '@hooks/useCartFromStore';
import { TrashIcon } from '@heroicons/react/solid';
import ProductThumbnail from './ProductThumbnail';
import QuantitySelector from './QuantitySelector';

interface IProps {
    item: CartItem;
}

export default function CartItemCard({ item }: IProps): ReactElement {
    const { totalPrice } = useCartFromStore();

    const { triggerDispatchRemoveItem } = useCartFromStore();

    const getCartItemThumbnailSrc = (thumbnail: TSimplifiedImage | string) =>
        typeof thumbnail === 'string' ? thumbnail : thumbnail.src;
    return (
        <li
            key={item.variationId}
            className="flex flex-wrap px-10 py-6 sm:px-0 sm:flex-nowrap"
        >
            <ProductThumbnail
                imageSrc={getCartItemThumbnailSrc(item.thumbnail)}
            />

            <FlexContainer
                justify="justify-between"
                direction="flex-col"
                className="w-full py-2 sm:ml-6"
            >
                <FlexContainer
                    direction="flex-col"
                    justify="justify-between"
                    className="w-full md:flex-row"
                >
                    <SubTitle
                        heading="h4"
                        className="text-sm font-medium text-white cursor-pointer hover:text-zinc-300"
                    >
                        <p>{item.name}</p>
                    </SubTitle>
                    <p className="text-sm font-medium text-white md:ml-6 whitespace-nowrap">
                        {totalPrice}
                    </p>
                </FlexContainer>
                <FlexContainer
                    direction="flex-row"
                    justify="justify-between"
                    className="w-full sm:pr-2"
                >
                    <QuantitySelector item={item} />
                    <Button
                        handleClick={() =>
                            triggerDispatchRemoveItem({
                                productId: item.productId,
                                variationId: item.variationId,
                            })
                        }
                        type="button"
                        className="py-1 text-sm font-medium text-white hover:text-zinc-300"
                    >
                        <TrashIcon width={20} height={20} />
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </li>
    );
}
