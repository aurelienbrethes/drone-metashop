import { RootState } from '@redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItem,
    empty,
    increaseQuantity,
    removeItem,
    updateQuantity,
} from '@redux/actions';

// Selectors are functions wich compute a derived state from values or functions
import {
    totalPriceSelector,
    totalItemsInCartSelector,
    combineSelectors,
} from '@redux/selectors/cart.selectors';
import {
    isItemPurchasable,
    isItemInStorePurchasable,
    findItemInStore,
    findItemInStoreById,
    getQuantityPayload,
    getQuantityUpdatePayload,
} from '@src/hooks/utils';

const useCartFromStore = () => {
    const cartItems = useSelector((state: RootState) => state.cart);
    const totalPrice = useSelector(totalPriceSelector);
    const isPurchasableSelector: ComputedCartItem[] =
        useSelector(combineSelectors);

    const totalItemsInCart: number = useSelector(totalItemsInCartSelector);

    const dispatch = useDispatch();

    const isPurchasable = ({
        item,
        isVariant,
    }: {
        item: IMetaShopProduct | IMetaShopVariant;
        isVariant: boolean;
    }) => {
        const itemInStore = findItemInStore(cartItems, item, isVariant);
        return itemInStore
            ? isItemInStorePurchasable({
                  cartItems,
                  item: itemInStore as CartItem,
              })
            : isItemPurchasable({ item });
    };

    const triggerDispatchAddItem = (payload: CartItemPayload) => {
        if (
            isItemInStorePurchasable({
                cartItems,
                item: payload,
            }) === false
        )
            return;

        const itemInCartIndex = cartItems.findIndex((item) =>
            payload.variationId
                ? item.variationId === payload.variationId
                : item.productId === payload.productId,
        );

        const { variationId, productId } = payload;

        if (itemInCartIndex !== -1)
            dispatch(
                increaseQuantity({
                    variationId,
                    productId,
                }),
            );
        else dispatch(addItem(payload));
    };

    const triggerDispatchRemoveItem = (payload: UpdtateCartItemPayload) =>
        dispatch(removeItem(payload));

    const triggerDispatchEmpty = () => dispatch(empty());

    const triggerDispatchIncreaseQuantity = (
        payload: UpdtateCartItemPayload,
    ) => {
        const itemInStore = findItemInStoreById(payload, cartItems);

        if (!itemInStore) return;

        if (
            isItemInStorePurchasable({
                cartItems,
                item: itemInStore,
            }) === true
        )
            dispatch(
                updateQuantity({
                    ...payload,
                    quantity: getQuantityPayload(itemInStore, 1),
                }),
            );
    };

    const triggerDispatchDecreaseQuantity = (
        payload: UpdtateCartItemPayload,
    ) => {
        const itemInStore = findItemInStoreById(payload, cartItems);

        if (itemInStore && itemInStore.quantity > 1)
            dispatch(
                updateQuantity({
                    ...payload,
                    quantity: getQuantityPayload(itemInStore, -1),
                }),
            );
    };

    const triggerDispatchUpdateQuantity = (
        payload: UpdateCartItemQuantityPayload,
    ) => {
        if (payload.quantity <= 0) {
            return;
        }
        const itemInStore = findItemInStoreById(payload, cartItems);

        if (!itemInStore) {
            return;
        }

        dispatch(
            updateQuantity({
                ...payload,
                quantity: getQuantityUpdatePayload(
                    itemInStore,
                    payload.quantity,
                ),
            }),
        );
    };

    return {
        cartItems,
        triggerDispatchAddItem,
        triggerDispatchRemoveItem,
        triggerDispatchEmpty,
        triggerDispatchUpdateQuantity,
        triggerDispatchIncreaseQuantity,
        triggerDispatchDecreaseQuantity,
        totalItemsInCart,
        totalPrice,
        isPurchasableSelector,
        isPurchasable,
    };
};

export default useCartFromStore;
