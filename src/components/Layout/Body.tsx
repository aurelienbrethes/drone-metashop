import useAppState from '@hooks/useAppState';

import React, { ReactNode } from 'react';
import CartPortal from '../Cart/CartPortal';

type ComponentProps = {
    children: ReactNode;
};

function Body({ children }: ComponentProps): JSX.Element {
    const { isCartOpen } = useAppState();

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-900">
            {children}
            {isCartOpen && <CartPortal />}
        </div>
    );
}

export default Body;
