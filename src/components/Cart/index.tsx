/* This example requires Tailwind CSS v2.0+ */
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toggleCart } from '@redux/actions';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';
import Spinner from '@components/UI/Spinner';
import useCartFromStore from '@src/hooks/useCartFromStore';
import useAppState from '@hooks/useAppState';
import leftArrow from '../../../public/icons/Vector.png';
import metamask from '../../../public/images/metamask_logo.png';

import PricingDetails from './PricingDetails';
import QuantitySelector from './Card/QuantitySelector';

const Cart = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { dispatchToggleCart, allProducts } = useAppState();
    const { cartItems } = useCartFromStore();
    const { t } = useTranslation();

    return (
        <aside className="w-screen min-h-screen p-5 sm:w-full sm:p-10 bg-gradient-to-b from-zinc-700 to-zinc-800">
            {cartItems.length ? (
                <>
                    <button
                        type="button"
                        className="absolute flex px-4 py-2 align-middle rounded top-4 left-4"
                        onClick={() => dispatchToggleCart()}
                    >
                        <Image
                            src={leftArrow}
                            alt="left arrow"
                            layout="fixed"
                            width={15}
                            height={25}
                            className="duration-200 hover:scale-125"
                        />
                        <p className="ml-5 duration-300 hover:translate-x-2">
                            {t('modalCart.backButton')}
                        </p>
                    </button>
                    <div className="flex flex-col w-full h-full overflow-y-hidden align-middle mt-14">
                        <p className="ml-2 text-base font-bold tracking-widest">
                            {cartItems[0].name}
                        </p>
                        <div className="flex justify-around">
                            <Image
                                src={allProducts[0].images[1].src}
                                alt="drone photo"
                                height={300}
                                width={300}
                            />
                        </div>
                        <div className="flex justify-center w-full my-2">
                            <QuantitySelector item={cartItems[0]} />
                        </div>
                        <div className="flex flex-col my-8 border-t-2">
                            <PricingDetails />
                            <button
                                onClick={() => {
                                    dispatch(toggleCart());
                                    router.push('/order');
                                }}
                                className="flex justify-center px-6 py-4 mt-8 rounded bg-zinc-500 right-16 hover:bg-white/20 drop-shadow-lg hover:drop-shadow-xl"
                                type="submit"
                            >
                                <p className="mr-6 font-semibold tracking-wide">
                                    {t('modalCart.payButton')}
                                </p>
                                <Image
                                    src={metamask}
                                    alt="metamask logo"
                                    layout="fixed"
                                    width={25}
                                    height={25}
                                />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <Spinner />
            )}
        </aside>
    );
};

export default Cart;
