interface IMetaShopProduct
    extends Pick<
        IProductWithCustomOptions,
        | 'id'
        | 'name'
        | 'slug'
        | 'type'
        | 'description'
        | 'price'
        | 'purchasable'
        | 'categories'
        | 'images'
    > {
    shortDescription: IProductWithCustomOptions['short_description'];
    taxClass: IProductWithCustomOptions['tax_class'];
    stockQuantity: IProductWithCustomOptions['stock_quantity'];
    managedStock: IProductWithCustomOptions['manage_stock'];
    customOptions: IProductWithCustomOptions['custom_options'];
    minPrice: IProductWithCustomOptions['min_price'];
    maxPrice: IProductWithCustomOptions['max_price'];
}

interface IMetaShopVariant
    extends Pick<
        IVariationWithAdditionnalImages,
        | 'id'
        | 'price'
        | 'sku'
        | 'attributes'
        | 'images'
        | 'thumbnail'
        | 'purchasable'
    > {
    taxClass: IVariationWithAdditionnalImages['tax_class'];
    stockQuantity: IVariationWithAdditionnalImages['stock_quantity'];
    managedStock: IVariationWithAdditionnalImages['manage_stock'];
}

interface IProductQuantities {
    id: number;
    quantity: number | null;
    variantsQuantities: IVariationQuantity[] | null;
}

type IVariationQuantity = Omit<IProductQuantities, 'variantsQuantities'>;
