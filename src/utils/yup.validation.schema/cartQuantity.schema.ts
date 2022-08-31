import MAX_QUANTITY_PURCHASABLE from '@src/constants/cart.constants';
import * as yup from 'yup';

const cartQuantitySchema = () =>
    yup
        .object({
            quantity: yup
                .number()
                .integer()
                .moreThan(0)
                .lessThan(+MAX_QUANTITY_PURCHASABLE + 1)
                .required(),
        })
        .required();

export default cartQuantitySchema;
