import getDCContacts from '@utils/contacts.utils';

const { email, businessName, taxRegistration } = getDCContacts();

// TODO: Replace by back datas
const invoiceBody = {
    meta: {
        format: 'rnf_invoice',
        version: '0.0.3',
    },
    sellerInfo: {
        businessName,
        firstName: '',
        lastName: '',
        email,
        taxRegistration,
    },
    paymentCurrency: process.env.PAYMENT_CURRENCY || 'FAU-rinkeby',
    paymentAddress: process.env.PAYMENT_WALLET_ADDRESS,
};

export default invoiceBody;

export const requestInvoicingUrl =
    process.env.NEXT_PUBLIC_REQUEST_INVOICING_URL ||
    'https://baguette-app.request.finance';

export enum WooAddressKeys {
    ADDRESS = 'woocommerce_store_address',
    ADDRESS2 = 'woocommerce_store_address_2',
    POSTCODE = 'woocommerce_store_postcode',
    CITY = 'woocommerce_store_city',
    COUNTRY = 'woocommerce_default_country',
}
