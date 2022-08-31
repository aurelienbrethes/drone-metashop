/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import useAppState from './useAppState';

const useToggleCheckout = (checkout: boolean) => {
    const { dispatchIsCheckingOut } = useAppState();

    /* const [toggle, setToggle] = useState<boolean>(false); */
    const [toggle] = useState<boolean>(checkout);

    useEffect(() => {
        dispatchIsCheckingOut(toggle);
    }, [toggle]);

    /* const startCheckout = () => setToggle(true);
    const stopCheckout = () => setToggle(false); */

    /* return { startCheckout, stopCheckout }; */
    return { toggle };
};

export default useToggleCheckout;
