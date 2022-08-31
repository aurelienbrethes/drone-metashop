import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface IProps {
    disabled?: boolean;
}

export default function InvoiceIcon({ disabled }: IProps): ReactElement {
    const router = useRouter();
    const handleClick = () => {
        router.push('/my-invoices');
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className={`flex align-middle items-center justify-center ${
                disabled && `opacity-40`
            } active:scale-100 ${!disabled && `hover:scale-105 `}`}
            disabled={disabled}
        >
            <div className="w-5 h-5 relative md:w-6 md:h-6">
                <Image
                    src="/icons/invoices.svg"
                    layout="responsive"
                    width={22}
                    height={22}
                />
            </div>
        </button>
    );
}
