import {
    ILineItemClientBody,
    IPostOrderBodyAfterMiddlleware,
} from '@src/interfaces/api';
import { ICreateWooCommerceOrderLineItem } from '@src/interfaces/woocommerce-bodys';
import { NextApiRequest } from 'next';

/**
 * Check if invoiceItems is an array of objects with id and quantity keys
 * @param lineItems as any because we don't know the type of the items yet
 * @returns true if invoiceItems is an array of objects with id and quantity keys
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkLineItemsContent = (lineItems: any[]): boolean =>
    lineItems.every((i) => {
        const { variationId, productId, quantity, ...rest } = i;
        return (
            !Object.keys(rest).length &&
            typeof productId === 'number' &&
            typeof quantity === 'number'
        );
    });

// TODO: Run real schema validation with Joi to check buyerInfos and cartItems schemas
const checkPostOrderBoby = (
    req: NextApiRequest,
): IPostOrderBodyAfterMiddlleware => {
    const { buyerInfo, lineItems: bodyLineItems, ...rest } = req.body;

    const restKeys = Object.keys(rest);

    if (!buyerInfo || !bodyLineItems) {
        throw new Error('Keys buyerInfo and lineItems are required');
    }

    if (restKeys.length) {
        throw new Error(
            `Key${restKeys.length > 1 ? 's' : ''} [${restKeys}] ${
                restKeys.length > 1 ? 'are' : 'is'
            } not allowed`,
        );
    }

    if (!checkLineItemsContent(bodyLineItems))
        throw new Error(
            'Invalid lineItems: only productId, variationId and quantity as numbers keys are allowed',
        );

    const lineItems: ICreateWooCommerceOrderLineItem[] = (
        bodyLineItems as ILineItemClientBody[]
    ).map(({ productId, variationId, quantity }) => ({
        product_id: productId,
        variation_id: variationId,
        quantity,
    }));

    return { buyerInfo, lineItems };
};

export default checkPostOrderBoby;
