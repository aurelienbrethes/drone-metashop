/* eslint-disable react/jsx-props-no-spreading */
import React, { ForwardedRef } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { SelectInput, TextInput } from '@components/FormsComponents';
import {
    AddressKeys,
    BuyerKeys,
    IFormData,
    MiscFormKeys,
} from 'src/interfaces/form';
import { yupResolver } from '@hookform/resolvers/yup';
import useCartFromStore from '@hooks/useCartFromStore';
import { useMutation, useQuery } from 'react-query';
import { orders, countries } from '@fetcher/next-api.fetcher';
import useCheckoutFromStore from '@hooks/useCheckoutFromStore';
import { useTranslation } from 'react-i18next';
import {
    IError,
    ILineItemClientBody,
    IPostOrderClientBody,
    IPostOrderResponse,
} from '@interfaces/api';
import { ISelectOption } from '@components/FormsComponents/SelectInput';
import { useRouter } from 'next/router';
import getOrderFormSchema from '@utils/yup.validation.schema/orderForm.schema';
import CustomToast from '@components/Toats/CustomToast';
import { AxiosError } from 'axios';
import useInvoicesState from '@src/hooks/useInvoicesState';
import { toast } from 'react-toastify';
import useToggleCheckout from '@hooks/useToggleCheckout';
import parser from 'html-react-parser';
import { DevTool } from '@hookform/devtools';
import HiddenButton from './HiddenButton';
import OrderFormHeader from './OrderFormHeader';
import HiddenCheckbox from './HiddenCheckbox';

interface IProps {
    checkboxRef: ForwardedRef<HTMLInputElement>;
    buttonRef: ForwardedRef<HTMLButtonElement>;
    countriesSelectOptions: ISelectOption[];
}

export default function OrderForm({
    checkboxRef,
    buttonRef,
    countriesSelectOptions,
}: IProps): JSX.Element {
    useToggleCheckout(true);
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
        watch,
    } = useForm<IFormData & FieldValues>({
        resolver: yupResolver(getOrderFormSchema({ country: 'FR' })),
    });
    const { dispatchOrderId, dispatchIsAwaitingRequest, dispatchBuyerInfos } =
        useCheckoutFromStore();

    const selectedCountry = watch(AddressKeys.COUNTRYNAME);

    const router = useRouter();

    const { dispatchAddInvoiceId } = useInvoicesState();

    const { data: countryStates = [{ value: '', label: 'State' }] } = useQuery(
        ['countries', selectedCountry, 'states'],
        () => countries.getOne(selectedCountry),
        {
            enabled: !!selectedCountry,
            select: (data) =>
                data.states.map(({ name, code }) => ({
                    label: name,
                    value: code,
                })),
        },
    );

    const { mutate } = useMutation<
        IPostOrderResponse,
        AxiosError<IError>,
        IPostOrderClientBody
    >(orders.create, {
        onSuccess: ({ invoiceId, orderId }) => {
            dispatchIsAwaitingRequest(false);
            dispatchAddInvoiceId({ invoiceId, orderId });
            dispatchOrderId(orderId);
            toast(<CustomToast message={t('orderForm.created')} />);
            router.push('/payment-swap');
        },
        onError: (error) => {
            dispatchIsAwaitingRequest(false);
            if (error.response) {
                toast.success(
                    <CustomToast
                        message={
                            parser(
                                error.response?.data.message as string,
                            ) as string
                        }
                    />,
                );
            }
        },
    });

    const { cartItems } = useCartFromStore();

    const onSubmitHandler = ({
        email,
        firstName,
        lastName,
        'agreed-to': agreedTo,
        ...address
    }: IFormData) => {
        dispatchIsAwaitingRequest(true);
        const lineItems: ILineItemClientBody[] = cartItems.map(
            ({ quantity, productId, variationId }) => ({
                quantity,
                productId,
                variationId,
            }),
        );
        const { state, ...rest } = address;
        const body: IPostOrderClientBody = {
            lineItems,
            buyerInfo: {
                agreedTo,
                address: { ...rest, region: state },
                email,
                lastName,
                firstName,
            },
        };

        dispatchBuyerInfos(body.buyerInfo);

        mutate(body);
    };

    return (
        <>
            <form className="flex flex-row items-center justify-center w-full h-full align-middle sm:overflow-hidden">
                <div className="w-full py-6 space-y-6">
                    <OrderFormHeader />
                    <div className="grid grid-cols-6 gap-12 mt-12">
                        <TextInput
                            label={t('orderForm.firstName')}
                            value={BuyerKeys.FIRSTNAME}
                            className="col-span-6 sm:col-span-3"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.firstname')}
                        />
                        <TextInput
                            label={t('orderForm.lastName')}
                            value={BuyerKeys.LASTNAME}
                            className="col-span-6 sm:col-span-3"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.lastname')}
                        />
                        <TextInput
                            label={t('orderForm.email')}
                            value={BuyerKeys.EMAIL}
                            className="col-span-6 sm:col-span-4"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.email')}
                        />
                        <SelectInput
                            label={t('orderForm.countryName')}
                            value={AddressKeys.COUNTRYNAME}
                            className="col-span-6 sm:col-span-3 text-sm font-medium text-gray-700"
                            register={register}
                            options={countriesSelectOptions}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.countryName')}
                            defaultValue="FR"
                        />
                        <TextInput
                            label={t('orderForm.streetAddress')}
                            value={AddressKeys.STREETADDRESS}
                            className="col-span-6"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.streetAddress')}
                        />
                        <TextInput
                            label={t('orderForm.locality')}
                            value={AddressKeys.LOCALITY}
                            className="col-span-6 sm:col-span-6 lg:col-span-2"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.locality')}
                        />
                        <SelectInput
                            label={t('orderForm.state')}
                            value={AddressKeys.STATE}
                            options={countryStates}
                            className="col-span-6 sm:col-span-6 lg:col-span-2 text-sm font-medium text-gray-700"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.state')}
                        />
                        <TextInput
                            label={t('orderForm.postalCode')}
                            value={AddressKeys.POSTALCODE}
                            className="col-span-6 sm:col-span-3 lg:col-span-2"
                            register={register}
                            errors={errors}
                            errorMessage={t('errorsFormMessages.postalCode')}
                        />
                    </div>
                    <HiddenCheckbox
                        ref={checkboxRef}
                        value={MiscFormKeys.AGREEDTO}
                        setValue={setValue}
                        register={register}
                    />
                    <HiddenButton
                        ref={buttonRef}
                        handleClick={handleSubmit(onSubmitHandler)}
                    />
                </div>
            </form>
            <DevTool control={control} /> {/* set up the dev tool */}
        </>
    );
}
