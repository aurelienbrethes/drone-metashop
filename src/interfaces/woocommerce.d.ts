/* eslint-disable @typescript-eslint/no-explicit-any */

interface IProduct {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    type: 'simple' | 'variable' | 'grouped' | 'external';
    status: 'any' | 'draft' | 'pending' | 'private' | 'publish';
    featured: boolean;
    catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
    description: string;
    short_description: string;
    sku: string;
    price: string;
    min_price: string;
    max_price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from: Date | null;
    date_on_sale_from_gmt: Date | null;
    date_on_sale_to: Date | null;
    date_on_sale_to_gmt: Date | null;
    price_html: string;
    on_sale: boolean;
    purchasable: boolean;
    total_sales: number;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[]; // TODO look at Downloads properties
    download_limit: number;
    download_expiry: number;
    external_url: string;
    button_text: string;
    tax_status: 'taxable' | 'shipping' | 'none';
    tax_class: 'standard' | 'reduced-rate' | 'zero-rate' | '';
    manage_stock: boolean;
    stock_quantity: number | null;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    backorders: 'no' | 'notify' | 'yes';
    backorders_allowed: boolean;
    backordered: boolean;
    low_stock_amount: number | null;
    sold_individually: boolean;
    weight: string;
    dimensions: IDimensions;
    shipping_required: boolean;
    shipping_taxable: boolean;
    shipping_class: string;
    shipping_class_id: number;
    reviews_allowed: boolean;
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    upsell_ids: number[];
    cross_sell_ids: number[];
    parent_id: number;
    purchase_note: string;
    categories: Partial<ICategory>[];
    tags: ITag[];
    images: IImage[];
    attributes: IAttribute[];
    default_attributes: IAttribute[]; // TODO look at default attributes properties
    variations: number[];
    grouped_products: number[];
    menu_order: number;
    meta_data: IMetaDatum[];
    _links: ILinks;
}

interface IProductWithCustomOptions extends IProduct {
    custom_options: ICustomAttribute[];
}

interface ICategory {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
    display: string;
    image: IImage;
    menu_order: number;
    count: number;
    _links: ILinks;
}

interface ICollection {
    href: string;
}

interface IDimensions {
    length: string;
    width: string;
    height: string;
}

interface IMetaDatum {
    id: number;
    key: string;
    value: string;
}

interface ILineItem {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    subtotal_tax: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: IMetaData[];
    sku: string;
    price: number;
}

interface IShippingLine {
    id: number;
    method_title: string;
    method_id: string;
    instance_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: any[];
}

interface IMetaDataLineItem {
    // built from my own object sending in, disregard if necessary!
    key: string;
    value: string;
}

interface ICart {
    // built from my own object sending in, disregard if necessary!
    payment_method: string;
    payment_method_title: string;
    billing: IBilling;
    shipping: IShipping;
    line_items: Array<ILineItem>;
    shipping_lines: Array<IShippingLine>;
    customer_id: number;
    meta_data: Array<IMeta_Data_Line_Item>;
    set_paid: false;
}

interface IAttribute {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

interface IOneAttribute {
    id: number;
    name: string;
    option: string;
}

interface IImage {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    src: string;
    name: string;
    alt: string;
    position: number;
}

interface Attribute {
    id: number;
    name: string;
    option: string;
}

interface IMetaData {
    id: number;
    key: string;
    value: string;
}

interface IUp {
    href: string;
}

interface ICustomer {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    username: string;
    billing: IBilling;
    shipping: IShipping;
    is_paying_customer: boolean;
    avatar_url: string;
    meta_data: IMetaData[];
    _links: ILinks;
}

interface IOrder {
    id: number;
    parent_id: number;
    number: string;
    order_key: string;
    created_via: string;
    version: string;
    status: string;
    currency: string;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    cart_tax: string;
    total: string;
    total_tax: string;
    prices_include_tax: boolean;
    customer_id: number;
    customer_ip_address: string;
    customer_user_agent: string;
    customer_note: string;
    billing: IBilling;
    shipping: IShipping;
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    date_paid?: Date;
    date_paid_gmt?: Date;
    date_completed?: Date;
    date_completed_gmt?: Date;
    cart_hash: string;
    meta_data: any[];
    line_items: ILineItem[];
    tax_lines: any[];
    shipping_lines: IShippingLine[];
    fee_lines: any[];
    coupon_lines: any[];
    refunds: any[];
    _links: ILinks;
    /* DC add-ons */
    invoice_id: string;
}

interface ILinks {
    self: ISelf[];
    collection: ICollection[];
    up?: IUp[];
}

interface IBilling {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}

interface IShipping {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
}

interface IVariation {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    description: string;
    permalink: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    date_on_sale_from?: any;
    date_on_sale_from_gmt?: any;
    date_on_sale_to?: any;
    date_on_sale_to_gmt?: any;
    on_sale: boolean;
    visible: boolean;
    purchasable: boolean;
    virtual: boolean;
    downloadable: boolean;
    downloads: any[];
    download_limit: number;
    download_expiry: number;
    tax_status: string;
    tax_class: string;
    manage_stock: boolean | 'parent';
    stock_quantity: number | null;
    in_stock: boolean;
    backorders: string;
    backorders_allowed: boolean;
    backordered: boolean;
    weight: string;
    dimensions: IDimensions;
    shipping_class: string;
    shipping_class_id: number;
    image: IImage;
    attributes: Attribute[];
    menu_order: number;
    meta_data: IMetaData[];
    _links: ILinks;
}

interface INote {
    id: number;
    author: string;
    date_created: string;
    date_created_gmt: string;
    note: string;
    customer_note: boolean;
    _links: {
        self: [
            {
                href: string;
            },
        ];
        collection: [
            {
                href: string;
            },
        ];
        up: [
            {
                href: string;
            },
        ];
    };
}

type TSimplifiedImage = Omit<
    IImage,
    'date_created' | 'date_created_gmt' | 'date_modified' | 'date_modified_gmt'
>;

interface IVariationWithAdditionnalImages extends Omit<IVariation, 'image'> {
    images: TSimplifiedImage[];
    thumbnail: TSimplifiedImage;
}

interface ISelf {
    href: string;
}

interface ITag {
    id: number;
    name: string;
    slug: string;
}

interface IAttributeResponse {
    id: number;
    name: string;
    slug: string;
    type: string;
    order_by: string;
    has_archives: boolean;
    _links: {
        self: {
            href: string;
        }[];
        collection: {
            href: string;
        }[];
    };
}

interface ICustomAttribute {
    id: string;
    name: string;
    label: string;
    terms: IOption[];
}

interface IOption {
    id: number;
    name: string;
    slug: string;
    metas: OptionMetas | null;
}

type OptionMetas =
    | {
          id: number;
          type: 'color';
          color: string;
          image: '0';
      }
    | {
          id: number;
          type: 'photo';
          color: string;
          image: IOptionImage;
      };

interface IOptionImage {
    id: number;
    url: string;
    name: string;
}

interface ClientParams {
    context: string; // Scope under which the request is made; determines fields present in response. Options: view and edit. Default is view.
    page: number; // Current page of the collection. Default is 1.
    per_page: number; // Maximum number of items to be returned in result set. Default is 10.
    search: string; // Limit results to those matching a string.
    after: string; // Limit response to resources published after a given ISO8601 compliant date.
    before: string; // Limit response to resources published before a given ISO8601 compliant date.
    exclude: number[]; // Ensure result set excludes specific IDs.
    include: number[]; // Limit result set to specific ids.
    offset: number; // Offset the result set by a specific number of items.
    order: string; // Order sort attribute ascending or descending. Options: asc and desc. Default is desc.
    orderby: string; // Sort collection by object attribute. Options: date, id, include, title, slug, price, popularity and rating. Default is date.
    parent: number[]; // Limit result set to those of particular parent IDs.
    parent_exclude: number[]; // Limit result set to all items except those of a particular parent ID.
    slug: string; // Limit result set to products with a specific slug.
    status: string; // Limit result set to products assigned a specific status. Options: any, draft, pending, private and publish. Default is any.
    type: string; // Limit result set to products assigned a specific type. Options: simple, grouped, external and variable.
    sku: string; // Limit result set to products with a specific SKU.
    featured: boolean; // Limit result set to featured products.
    category: string; // Limit result set to products assigned a specific category ID.
    tag: string; // Limit result set to products assigned a specific tag ID.
    shipping_class: string; // Limit result set to products assigned a specific shipping class ID.
    attribute: string; // Limit result set to products with a specific attribute.
    attribute_term: string; // Limit result set to products with a specific attribute term ID (required an assigned attribute).
    tax_class: string; // Limit result set to products with a specific tax class. Default options: standard, reduced-rate and zero-rate.
    on_sale: boolean; // Limit result set to products on sale.
    min_price: string; // Limit result set to products based on a minimum price.
    max_price: string; // Limit result set to products based on a maximum price.
    stock_status: string;
}

interface SwatchTypeOptionValue<> {
    [key: string]: {
        attributes: {
            [key: string]: {
                type: 'color' | 'photo';
                color: string;
                image: string;
            };
        };
        layout: string;
        size: string;
        type: 'default' | 'term_options' | 'product_custom' | 'radio';
    };
}

interface ICountry {
    code: string;
    name: string;
    states: IState[];
    _links: ILinks;
}

interface IState {
    code: string;
    name: string;
}

interface ISetting {
    id: string;
    label: string;
    description: string;
    parent_id: string;
    sub_groups: ISubGroup[]; // TODO: Search this type later
    _links: ILinks;
}

interface ISettingOption {
    id: string;
    label: string;
    description: string;
    type: string;
    default: string;
    tip: string;
    value: string | string[];
    options?: {
        [key: string]: string;
    };
    _links: ILinks;
}
