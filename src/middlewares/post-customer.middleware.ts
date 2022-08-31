import { IBuyerInfos } from '@src/interfaces/request-network';
import { CreateWooCommerceCustomerBody } from '@src/interfaces/woocommerce-bodys';

const postCustomerMiddleware = (
    buyerInfo: IBuyerInfos,
): CreateWooCommerceCustomerBody => {
    const { firstName, lastName, email, address } = buyerInfo;
    const userInfos = { first_name: firstName, last_name: lastName, email };
    const {
        'country-name': country,
        'postal-code': postcode,
        'street-address': address1,
        locality: city,
        region: state = '',
    } = address;

    const shipping = {
        ...userInfos,
        company: '',
        country,
        postcode,
        address_1: address1,
        address_2: '',
        city,
        state,
    };
    return {
        email,
        first_name: firstName,
        last_name: lastName,
        username: email,
        shipping,
        billing: { ...shipping, phone: '' },
    };
};

export default postCustomerMiddleware;
