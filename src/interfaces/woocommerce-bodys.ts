export type CreateWooCommerceCustomerBody = Pick<
    ICustomer,
    'email' | 'first_name' | 'last_name' | 'shipping' | 'billing' | 'username'
>;

export interface ICreateWooCommerceOrderLineItem {
    product_id: number;
    variation_id?: number;
    quantity: number;
}

export interface ICreateWooCommerceOrderBody
    extends Pick<IOrder, 'payment_method' | 'payment_method_title'> {
    customer_id?: number;
    billing?: IBilling;
    shipping?: IShipping;
    transaction_id?: string;
    line_items: ICreateWooCommerceOrderLineItem[];
    set_paid: boolean;
}

export interface ICreateOrderNote {
    note: string;
}

export type OrderStatus =
    | 'pending'
    | 'processing'
    | 'on-hold'
    | 'completed'
    | 'cancelled'
    | 'refunded'
    | 'failed'
    | 'trash';

export type IUpdateWooCommerceOrderBody =
    Partial<ICreateWooCommerceOrderBody> & { status: OrderStatus };
