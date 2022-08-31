import useOnClickOutside from '@jidayyy/useonclickoutside';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import useAppState from '@hooks/useAppState';
import Contact from '@components/Contact';
import Cart from '.';

export default function CartPortal(): JSX.Element {
    const cartRef = useRef(null);

    const { insideModal, dispatchToggleCart, dispatchInsideModal } =
        useAppState();

    const handleClickOutside = () => {
        dispatchToggleCart();
        dispatchInsideModal('');
    };

    useOnClickOutside(cartRef, handleClickOutside);

    return ReactDOM.createPortal(
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="fixed top-0 right-0 z-50 flex justify-end w-screen h-screen bg-black bg-opacity-75"
        >
            <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 1, x: 300 }}
                transition={{ default: { duration: 0.1 } }}
                ref={cartRef}
                className="absolute top-0 right-0 w-full h-screen overflow-y-auto bg-white sm:w-auto"
            >
                {insideModal === 'cart' && <Cart />}
                {insideModal === 'contact' && <Contact />}
            </motion.div>
        </motion.div>,
        document.body,
    );
}
