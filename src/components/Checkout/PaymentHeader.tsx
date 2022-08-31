import React, { Dispatch, SetStateAction } from 'react';
import BillAmount from './BillAmount';

interface IProps {
    isSwapActive: boolean;
    setIsSwapActive: Dispatch<SetStateAction<boolean>>;
}

function PaymentHeader({ isSwapActive, setIsSwapActive }: IProps) {
    return (
        <div className="flex w-full justify-between mb-5 h-8">
            <BillAmount />
            {!isSwapActive && (
                <button
                    onClick={() => setIsSwapActive(true)}
                    className="bg-black text-white px-10 py-1 rounded-md"
                    type="button"
                >
                    SWAP
                </button>
            )}
        </div>
    );
}

export default PaymentHeader;
