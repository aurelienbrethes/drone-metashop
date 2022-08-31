import Button from '@components/UI/Button';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import useAppState from '@hooks/useAppState';

export default function CloseButton(): ReactElement {
    const { dispatchToggleCart } = useAppState();

    return (
        <Button
            handleClick={() => dispatchToggleCart()}
            className="font-extrabold"
        >
            <Image src="/icons/cross.png" width={15} height={15} />
        </Button>
    );
}
