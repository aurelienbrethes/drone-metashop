// TODO: check consistency of this type (sku, color, size, dimensions, weight can be undefined according to back datas)
interface CartItem {
    productId: number;
    variationId: number;
    name: string;
    slug: string;
    price: string;
    quantity: number;
    manage_stock: boolean;
    category: string;
    taxRate: string;
    stockQuantity: number | null;
    thumbnail: string;
    optionsRepr: string;
}

type CartItemPayload = Omit<CartItem, 'quantity' | 'images'>;

type UpdtateCartItemPayload = Pick<CartItem, 'productId' | 'variationId'>;

type UpdateCartItemQuantityPayload = UpdtateCartItemPayload & {
    quantity: CartItem['quantity'];
};

// An object that represent a cart item with all derived states
type ComputedCartItem = CartItem;
