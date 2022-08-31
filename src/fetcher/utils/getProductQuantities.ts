/**
 * @description Get the quantities infos for a given product and its variants
 * @param product as IMetashopProduct
 * @param variants as array of IMetaShopVariant
 * @returns IProductQuanties datas
 */
const getProductQuantities = (
    product: IMetaShopProduct,
    variants: IMetaShopVariant[] | null,
): IProductQuantities => {
    let productQuantity = null;
    if (product.managedStock) {
        productQuantity = product.stockQuantity;
    }

    let variantsQuantities = null;
    if (variants && variants.length) {
        variantsQuantities = variants.map((variant) => ({
            id: variant.id,
            quantity: variant.managedStock ? variant.stockQuantity : null,
        }));
    }

    return {
        id: product.id,
        quantity: productQuantity,
        variantsQuantities,
    };
};

export default getProductQuantities;
