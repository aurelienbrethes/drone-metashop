import React, { useRef, useState } from 'react';
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import Button from '@components/UI/Button';
import Title from '@components/UI/Title';
import FlexContainer from '@components/UI/FlexContainer';
import ListCartItems from '@components/Cart/ListCartItems';
import OrderForm from '@components/Order/OrderForm';
import PricingDetails from '@components/Cart/PricingDetails';
import useCheckoutFromStore from '@hooks/useCheckoutFromStore';
import Spinner from '@components/UI/Spinner';
import useToggleCheckout from '@hooks/useToggleCheckout';
import BackButton from '@components/UI/BackButton';
import useCartFromStore from '@src/hooks/useCartFromStore';
// import classNames from '@utils/tailwind';
import LegalApproveInput from '@components/Order/OrderForm/LegalApproveInput';
import { countries, settings } from '@fetcher/woocommerce.fetcher';
import { ISelectOption } from '@components/FormsComponents/SelectInput';
import { useRouter } from 'next/router';

interface IProps {
    countriesSelectOptions: ISelectOption[];
}

const OrderPage: NextPage<IProps> = ({ countriesSelectOptions }: IProps) => {
    const [enabledPlaceOrder, setEnabledPlaceOrder] = useState<boolean>(false);
    const router = useRouter();
    const { cartItems } = useCartFromStore();
    const { t } = useTranslation();
    const { isAwaitingRequest } = useCheckoutFromStore();
    useToggleCheckout(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
        return null;
    };

    const handleOnChange = () => {
        if (checkboxRef && checkboxRef.current) {
            checkboxRef.current.click();
        }
        const isChecked = checkboxRef.current
            ? checkboxRef.current?.checked
            : false;

        setEnabledPlaceOrder(cartItems.length > 0 && isChecked);
    };

    return (
        <div className="w-full">
            <BackButton />
            <div className="flex flex-col w-full h-full grid-cols-5 grid-rows-3 gap-4 mx-auto mt-12 lg:max-w-7xl lg:min-h-min lg:grid">
                <FlexContainer
                    direction="flex-col"
                    className="col-span-3 row-start-1 row-end-3"
                    justify="justify-center"
                >
                    <Title text="Checkout" className="sr-only" />
                    <OrderForm
                        buttonRef={buttonRef}
                        checkboxRef={checkboxRef}
                        countriesSelectOptions={countriesSelectOptions}
                    />
                </FlexContainer>
                <FlexContainer
                    className="col-start-4 col-end-6 row-start-1 row-end-3 lg:block"
                    justify="justify-start"
                    direction="flex-col"
                >
                    <ListCartItems cartItems={cartItems} />
                </FlexContainer>
                <FlexContainer
                    className="px-4 mb-4 lg:col-start-4 lg:col-end-6 lg:row-start-2"
                    justify="justify-end"
                    direction="flex-col"
                >
                    <PricingDetails />
                    <LegalApproveInput
                        handleOnChange={handleOnChange}
                        disabled={!(cartItems.length > 0)}
                    />
                    <Button
                        type="submit"
                        handleClick={handleClick}
                        className="inline-flex justify-center px-10 py-3 mb-3 text-sm font-semibold tracking-wider rounded text-bold right-16 bg-white/20 hover:bg-white/30 drop-shadow-xl hover:drop-shadow-2xl"
                        disabled={!enabledPlaceOrder}
                        /* className={classNames(
                            `border border-transparent rounded-md shadow-sm px-20 py-2 mt-2 mb-3 inline-flex justify-center text-base font-medium ${
                                enabledPlaceOrder
                                    ? `bg-blue-sapphire text-white hover:bg-indigo-dye focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
                                    : `text-gray-400 bg-gray-200`
                            }`,
                        )} */
                    >
                        {isAwaitingRequest ? (
                            <Spinner width="6" />
                        ) : (
                            t('orderForm.submit')
                        )}
                    </Button>

                    <button
                        className="w-full text-sm text-center cursor-pointer hover:text-white"
                        type="button"
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        {t('orderForm.continueShopping')}
                    </button>
                </FlexContainer>
            </div>
        </div>
    );
};

export default OrderPage;

export const getStaticProps: GetStaticProps<IProps> = async (): Promise<
    GetStaticPropsResult<IProps>
> => {
    const allWooCountries = await countries.getAll();

    const acceptedCountries = (
        await settings.getOneOption(
            'general',
            'woocommerce_specific_allowed_countries',
        )
    ).value as string[];

    const countriesSelectOptions: ISelectOption[] = allWooCountries
        .filter((country) => acceptedCountries.includes(country.code))
        .map(({ code, name }) => ({ label: name, value: code }));

    return {
        props: {
            countriesSelectOptions,
        },
        revalidate: 10,
    };
};
