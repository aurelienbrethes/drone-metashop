import MAX_QUANTITY_PURCHASABLE from '@src/constants/cart.constants';

interface IArgs {
    cartItems: CartItem[];
    item: CartItemPayload;
}

export const findItemInStoreById = (
    payload: UpdtateCartItemPayload,
    cartItems: CartItem[],
) =>
    cartItems.find((i) =>
        payload.variationId
            ? i.variationId === payload.variationId
            : i.productId === payload.productId,
    );

export const findItemInStore = (
    cartItems: CartItem[],
    item: IMetaShopVariant | IMetaShopProduct,
    isVariant: boolean,
): CartItem | null => {
    const itemInStore = cartItems.find((i) =>
        isVariant ? i.variationId === item.id : i.productId === item.id,
    );
    return itemInStore || null;
};

const computeMinPurchasableQuantity = (
    itemInStore: CartItem | undefined,
    quantity?: number | undefined,
) => {
    let quantities = [
        +MAX_QUANTITY_PURCHASABLE,
        quantity || itemInStore?.quantity || 0,
    ];
    quantities = itemInStore?.manage_stock
        ? [...quantities, itemInStore?.stockQuantity || 0]
        : [...quantities];
    return Math.min(...quantities);
};

export const getQuantityPayload = (
    itemInStore: CartItem | undefined,
    step: -1 | 1,
) => computeMinPurchasableQuantity(itemInStore) + step;

export const getQuantityUpdatePayload = (
    itemInStore: CartItem | undefined,
    quantity: number,
) => computeMinPurchasableQuantity(itemInStore, quantity);

export const isItemInStorePurchasable = ({ cartItems, item }: IArgs) => {
    const stockQuantity = item.stockQuantity || 0;
    const id = item.variationId ? item.variationId : item.productId;
    const itemInStore = cartItems.find(
        (i) => i.variationId === id || i.productId === id,
    );

    if (!itemInStore && item.stockQuantity !== null && item.stockQuantity <= 0)
        return false;

    if (!itemInStore) return true;

    return item.manage_stock === false
        ? itemInStore.quantity < +MAX_QUANTITY_PURCHASABLE
        : stockQuantity > itemInStore.quantity &&
              itemInStore.quantity < +MAX_QUANTITY_PURCHASABLE;
};

export const isItemPurchasable = ({
    item,
}: {
    item: IMetaShopProduct | IMetaShopVariant;
}) =>
    !item.managedStock ||
    (item.stockQuantity && item.stockQuantity > 0 && item.purchasable);
