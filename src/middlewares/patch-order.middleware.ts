import { IValidateOrderPaymentBody } from '@src/interfaces/api';
import { NextApiRequest } from 'next';

const checkValidateOrderPaymentBody = (
    req: NextApiRequest,
): IValidateOrderPaymentBody => {
    const { txHash, ...rest } = req.body;

    const restKeys = Object.keys(rest);

    if (!txHash) {
        rest.status(400);
        throw new Error('txHash is required');
    }

    const isPluralSentence = !!(restKeys.length > 1);

    if (restKeys.length) {
        rest.status(400);
        throw new Error(
            `Key${isPluralSentence ? 's' : ''} [${restKeys}] ${
                isPluralSentence ? 'are' : 'is'
            } not allowed`,
        );
    }

    return { txHash };
};

export default checkValidateOrderPaymentBody;
