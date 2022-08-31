import { WooAddressKeys } from '@src/constants/request.constants';
import { AddressKeys } from '@src/interfaces/form';
import { IInvoiceAddress } from '@src/interfaces/request-network';

const getRequestAddressKey = (key: string): keyof IInvoiceAddress => {
    switch (key) {
        case WooAddressKeys.ADDRESS:
            return AddressKeys.STREETADDRESS;
        case WooAddressKeys.ADDRESS2:
            return AddressKeys.EXTENDEDADDRESS;
        case WooAddressKeys.POSTCODE:
            return AddressKeys.POSTALCODE;
        case WooAddressKeys.CITY:
            return AddressKeys.LOCALITY;
        case WooAddressKeys.COUNTRY:
            return AddressKeys.COUNTRYNAME;
        default:
            throw new Error('Unknown address key');
    }
};

const getAddressValue = (newValue: string, oldValue?: string): string =>
    oldValue ? `${oldValue} ${newValue}` : newValue;

const convertWooAddressIntoRequestAddress = (settings: ISettingOption[]) =>
    settings
        .filter((o) =>
            Object.values(WooAddressKeys).includes(o.id as WooAddressKeys),
        )
        .reduce((shopAddress, { id, value, options }) => {
            const key = getRequestAddressKey(id);

            return {
                ...shopAddress,
                [key]: getAddressValue(
                    options && typeof value === 'string'
                        ? options[value]
                        : value.toString(),
                    shopAddress[key],
                ),
            };
        }, {} as IInvoiceAddress);

export default convertWooAddressIntoRequestAddress;
