import { FieldError } from 'react-hook-form';

export interface IFormData extends FormAddress, FormMisc {
    firstName: string;
    lastName: string;
    email: string;
}

export interface IFormErrors
    extends Partial<Record<keyof IFormData, FieldError | undefined>> {
    [x: string]: FieldError | undefined;
}

export enum AddressKeys {
    COUNTRYNAME = 'country-name',
    STREETADDRESS = 'street-address',
    EXTENDEDADDRESS = 'extended-address',
    POSTALCODE = 'postal-code',
    LOCALITY = 'locality',
    STATE = 'state',
}

export enum BuyerKeys {
    EMAIL = 'email',
    FIRSTNAME = 'firstName',
    LASTNAME = 'lastName',
}

export enum MiscFormKeys {
    AGREEDTO = 'agreed-to',
}

export type FormAddress = {
    [key in AddressKeys]: string;
};

export type FormMisc = {
    [MiscFormKeys.AGREEDTO]: boolean;
};
