/**
 * @description change stockQuantity of a product by updated value
 * @param product as IMetaShopProduct
 * @param quantity as a number or null
 * @returns IMetaShopProduct object with updated stockQuantity property
 */
export const refreshProductQuantity = (
    product: IMetaShopProduct,
    quantity: number | null,
): IMetaShopProduct => ({ ...product, stockQuantity: quantity });

/**
 * @description change stockQuantity of a variant by updated value
 * @param variant as IMetashopVariant
 * @param variantQuantities as an array of IMetaShopVariantQuantity
 * @returns IMetaShopVariant object with updated stockQuantity property
 */
export const refreshVariantQuantity = (
    variant: IMetaShopVariant,
    variantQuantities: IVariationQuantity[],
): IMetaShopVariant => ({
    ...variant,
    stockQuantity:
        variantQuantities.find(
            (variantQuantity) => variantQuantity.id === variant.id,
        )?.quantity || null,
});
