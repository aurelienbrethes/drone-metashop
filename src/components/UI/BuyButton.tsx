import { useTranslation } from 'react-i18next';
import useAppState from '@src/hooks/useAppState';
import useCartFromStore from '@src/hooks/useCartFromStore';
import { generateCartItemPayload } from '@utils/shop.utils';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { products as clientProductsFetcher } from 'src/fetcher/next-api.fetcher';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { refreshProductQuantity } from '@utils/quantities.utils';
import CustomToast from '@components/Toats/CustomToast';
import addCart from '../../../public/icons/open_cart.svg';
import viewCart from '../../../public/icons/view_cart.svg';

interface IProps {
    buttonClass?: string;
    spanClass?: string;
}

const BuyButton = ({ buttonClass, spanClass }: IProps): ReactElement => {
    const { triggerDispatchAddItem, cartItems } = useCartFromStore();
    const { dispatchToggleCart, dispatchInsideModal, allProducts, isAuth } =
        useAppState();
    const { t } = useTranslation();
    const router = useRouter();
    const { slug } = router.query;

    const [product] = allProducts;

    const { data: productQuantities } = useQuery(
        ['products', `${slug}`, 'quantities'],
        () => clientProductsFetcher.getQuantities(product?.id),
        { enabled: !!product?.id && isAuth },
    );

    // Add one item in cart
    const addToCart = async () => {
        try {
            if (!productQuantities || !product) return;
            const { stockQuantity } = refreshProductQuantity(
                product,
                productQuantities?.quantity,
            );

            triggerDispatchAddItem(
                generateCartItemPayload({
                    variant: null,
                    product,
                    price: product.price,
                    manage_stock: product.managedStock,
                    taxRate: product.taxClass,
                    stockQuantity,
                    options: [],
                }),
            );
        } catch (e) {
            toast.error(<CustomToast message={(e as Error).message} />);
        }
    };

    // Open modal Cart
    const addOneToCart = () => {
        dispatchToggleCart();
        dispatchInsideModal('cart');
        if (!cartItems.length) {
            addToCart();
        }
    };

    return (
        <button
            type="button"
            onClick={() => addOneToCart()}
            className={` ${buttonClass || ''}`}
        >
            <span className={` flex justify-around w-full ${spanClass || ''}`}>
                <p className="text-sm font-semibold tracking-wider">
                    {cartItems.length
                        ? t('navBar.openButton')
                        : t('navBar.buyButton')}
                </p>
                <div className="items-center hidden lg:flex">
                    <Image
                        width={20}
                        height={20}
                        src={cartItems.length ? viewCart : addCart}
                        layout="fixed"
                    />
                </div>
            </span>
        </button>
    );
};

export default BuyButton;
