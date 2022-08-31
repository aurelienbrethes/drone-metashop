/**
 * Round values using scientific notation
 * @param value
 * @param decimals in percentage (e.g. 20 for 20%)
 * @returns price including taxes rounded to 2 decimals
 */
export const roundPrice = (value: number, decimals: number) =>
    Number(`${Math.round(+`${value}e${decimals}`)}e-${decimals}`);

/**
 *
 * @param priceExcludingTaxes
 * @param taxRate in percentage (e.g. 20 for 20%)
 * @returns price including taxes rounded to 2 decimals
 */
export const calculateFullPrice = (
    priceExcludingTaxes: number,
    taxRate: number,
): number => {
    const price = roundPrice(
        priceExcludingTaxes + +((priceExcludingTaxes * taxRate) / 100),
        2,
    );

    return price;
};

/**
 *
 * @param priceIncludingTaxes
 * @param taxRate in percentage (e.g. 20 for 20%)
 * @returns price excluding taxes rounded to 2 decimals
 */
export const calculatePriceBeforeTaxes = (
    priceIncludingTaxes: number,
    taxRate: number,
): number => {
    const price = roundPrice((priceIncludingTaxes * 100) / (100 + taxRate), 2);
    return price;
};

export const calculateTaxAmount = (
    priceIncludingTaxes: number,
    taxRate: number,
): number =>
    roundPrice(
        priceIncludingTaxes -
            calculatePriceBeforeTaxes(priceIncludingTaxes, taxRate),
        2,
    );

export const sanitizeAmount = (amount: string): string =>
    amount.replace(/[-,]/g, '.');

export const convertBigIntToNumber = (
    value: string,
    decimals: number,
): string => (+value / 10 ** decimals).toString();
