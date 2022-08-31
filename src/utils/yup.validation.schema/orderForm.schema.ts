import { PostalCodeCountryRegex } from '@constants/countries.constants';
import { AddressKeys } from 'src/interfaces/form';
import * as yup from 'yup';

const getPostalCodeRegex = (country: string): string | null => {
    const entry = Object.entries(PostalCodeCountryRegex).find(
        ([key]) => key === country,
    );
    if (entry) {
        return entry[1];
    }
    return null;
};

type TArgs = {
    country: string;
};

const getOrderFormSchema = ({ country }: TArgs) => {
    const alphaLengthRegex = new RegExp(/^[a-zA-Z]{2}(\w*([ -])?\w+)*$/);
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
    );

    return yup
        .object({
            firstName: yup.string().trim().matches(alphaLengthRegex).required(),
            lastName: yup.string().trim().matches(alphaLengthRegex).required(),
            email: yup.string().matches(emailRegex).required(),
            [AddressKeys.STREETADDRESS]: yup.string().required(),
            [AddressKeys.POSTALCODE]: yup
                .string()
                .matches(
                    new RegExp(
                        getPostalCodeRegex(country) ||
                            PostalCodeCountryRegex.FR,
                    ),
                )
                .required(),
            [AddressKeys.COUNTRYNAME]: yup.string().required(),
            locality: yup.string().required(),
            state: yup.string(),
        })
        .required();
};

export default getOrderFormSchema;
