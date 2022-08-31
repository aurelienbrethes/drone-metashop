/* eslint-disable import/no-extraneous-dependencies */
import { ISelectedOption } from '@src/hooks/useVariants';
import { WP_REST_API_Attachment } from 'wp-types';

interface IGenerateCartItemPayloadArgs {
    product: IMetaShopProduct;
    variant: IMetaShopVariant | null;
    manage_stock: boolean;
    stockQuantity: number | null;
    price: string;
    taxRate: string;
    options: ISelectedOption[];
}

/**
 * extract a IMetaShopProduct representation from a given IProduct from Woocommerce API
 *  @param product a IProductWithCustomOptions
 */
export const getIMetaShopProduct = (
    product: IProductWithCustomOptions,
): IMetaShopProduct => {
    const {
        id,
        name,
        slug,
        type,
        description,
        price,
        purchasable,
        categories,
        images,
        short_description: shortDescription,
        tax_class: taxClass,
        min_price: minPrice,
        max_price: maxPrice,
        stock_quantity: stockQuantity,
        manage_stock: managedStock,
        custom_options: customOptions,
    } = product;

    return {
        id,
        name,
        slug,
        type,
        description,
        price,
        purchasable,
        categories,
        images,
        shortDescription,
        taxClass,
        minPrice,
        maxPrice,
        stockQuantity,
        managedStock,
        customOptions,
    };
};

/**
 * extract a IMetaShopVariant representation from a given IVariationWithAdditionnalImages from Woocommerce API
 *  @param variant a IVariationWithAdditionnalImages
 */
export const getIMetaShopVariant = (
    variant: IVariationWithAdditionnalImages,
): IMetaShopVariant => {
    const {
        id,
        price,
        sku,
        attributes,
        images,
        thumbnail,
        purchasable,
        tax_class: taxClass,
        stock_quantity: stockQuantity,
        manage_stock: managedStock,
    } = variant;
    return {
        id,
        price,
        sku,
        attributes,
        images,
        thumbnail,
        taxClass,
        stockQuantity,
        managedStock,
        purchasable,
    };
};

/**
 * @description Function that convert many VariationWithAdditionnalImages into an array of IMetaShopVariant
 * @param variants array of IVariationWithAdditionnalImages
 * @returns array of IMetaShopVariant objects
 */
export const getIMetaShopVariants = (
    variants: IVariationWithAdditionnalImages[],
): IMetaShopVariant[] =>
    variants.map((variant) => getIMetaShopVariant(variant));

/**
 * @description convert a wordpress attachement image into an TSimplifiedImage
 * @param wordpressAttachement image in wordpress attachement schema
 * @params position: number that can be used to sort images
 * @returns TSimplifiedImage simplified image with only the necessary properties
 */
export const makeSimplifiedImage = (
    wordpressAttachement: WP_REST_API_Attachment,
    position: number,
): TSimplifiedImage => {
    const { id, alt_text: alt, title, source_url: src } = wordpressAttachement;
    return { id, name: title?.rendered, src, alt, position };
};

/**
 * @description recover the first category's name of a given product
 * @param product as IMetaShopProduct
 * @returns string representing first product category's name or empty string if no category is found
 */
export const getCategoryName = (product: IMetaShopProduct): string =>
    product.categories.length && product.categories[0].name
        ? product.categories[0].name
        : '';

/**
 * @description recover the first category's slug of a given product
 * @param product as IMetaShopProduct
 * @returns string representing first product category's slug or 'uncategorized' if no category is found
 */
export const getCategorySlug = (product: IMetaShopProduct): string =>
    product.categories.length && product.categories[0].slug
        ? product.categories[0].slug
        : 'uncategorized';

/**
 * @description generate an image url af a given product or variant
 * @param content as IMetaShopProduct or IMetaShopVariant
 * @returns string representing the image url or the local placeholder src path if no image is found
 */
export const generatePlaceHolderUrl = (
    content: IMetaShopVariant | IMetaShopProduct,
): string =>
    (content?.images?.length && content?.images[0]?.src) ||
    '/images/product_placeholder.png';

/**
 * @description generate a payload to add a variant datas to the cart
 * @param variant as IMetaShopVariant or null (simple product case)
 * @returns object with the variationId, sku and variantThumbnail properties
 */
const getVariantPayload = (variant: IMetaShopVariant | null) => ({
    variationId: variant?.id || 0,
    sku: variant?.sku || '',
    variantThumbnail: variant?.thumbnail.src || '',
});

/**
 * @description generate a payload to add a product to the cart
 * @param {IGenerateCartItemPayloadArgs} object that contain all infos properties
 * @returns CartItemPayload object to dispaatch in redux store
 */
export const generateCartItemPayload = ({
    product,
    variant,
    stockQuantity,
    manage_stock,
    price,
    taxRate,
    options,
}: IGenerateCartItemPayloadArgs): CartItemPayload => {
    const { name, slug, id: productId } = product;

    const variantPayload = getVariantPayload(variant);

    const category = getCategoryName(product);

    const optionsRepr = options
        .map((option) => `${option.optionValue}`)
        .join(' | ');

    const thumbnail =
        variantPayload.variantThumbnail || generatePlaceHolderUrl(product);
    return {
        productId,
        name,
        price,
        manage_stock,
        taxRate,
        category,
        stockQuantity,
        slug,
        thumbnail,
        optionsRepr,
        ...variantPayload,
    };
};

/**
 * @description Delete white spaces from a string (sanitize product options)
 * @param option as string
 * @returns string without white spaces
 */
export const deleteAttributeOptionSpaces = (option: string): string =>
    option.replace(/\s/g, '').replace(/\//g, '');

/**
 * @description truncate a long string with dots in the middle
 * @param string the word to truncate
 * @param nbLetters number of start & end characters to keep
 * @returns the truncated string
 */
export const getTruncatedString = (
    string: string | null,
    nbLetters: number,
) => {
    if (!string) return '';
    if (string.length < nbLetters * 2) return string;
    const { length } = string;

    const truncatedString = string.substring(nbLetters + 1, length - nbLetters);

    return string.replace(truncatedString, '...');
};
