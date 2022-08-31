import { RootState } from '@redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleCart,
    resetApp,
    setAuth,
    setIsCheckingOut,
    setSiteInfos,
    setCartProducts,
    setInsideModal,
} from '@redux/actions';

const useAppState = () => {
    const dispatch = useDispatch();

    const {
        isCartOpen,
        isAuth,
        isCheckingOut,
        siteDescription,
        siteLogoUrl,
        siteName,
        shopNotice,
        allProducts,
        insideModal,
    } = useSelector((state: RootState) => state.app);

    const dispatchToggleCart = () => {
        dispatch(toggleCart());
    };

    const dispatchIsCheckingOut = (payload: boolean) => {
        dispatch(setIsCheckingOut(payload));
    };

    const dispatchCartProducts = (payload: Array<IMetaShopProduct>) => {
        dispatch(setCartProducts(payload));
    };

    const dispatchSetSiteInfos = (
        payload: Omit<ISiteInfos, 'siteIconUrl' | 'siteUrl'>,
    ) => {
        dispatch(setSiteInfos(payload));
    };

    const dispatchInsideModal = (payload: string) => {
        dispatch(setInsideModal(payload));
    };

    const dispatchResetApp = () => dispatch(resetApp());

    const dispatchIsAuth = (isAuthStatus: boolean) =>
        dispatch(setAuth(isAuthStatus));

    return {
        isCartOpen,
        insideModal,
        isCheckingOut,
        isAuth,
        siteDescription,
        siteLogoUrl,
        siteName,
        shopNotice,
        allProducts,
        dispatchToggleCart,
        dispatchResetApp,
        dispatchIsCheckingOut,
        dispatchIsAuth,
        dispatchSetSiteInfos,
        dispatchCartProducts,
        dispatchInsideModal,
    };
};

export default useAppState;
