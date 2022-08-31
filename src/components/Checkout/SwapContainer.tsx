import React, { Dispatch, SetStateAction } from 'react';
import SwapHeader from './SwapHeader';
import SwapForm from './SwapForm';

interface IProps {
    setIsSwapActive: Dispatch<SetStateAction<boolean>>;
}

function SwapContainer({ setIsSwapActive }: IProps): JSX.Element {
    return (
        <div className="w-full md:w-6/12 bg-gray-100 rounded-md h-6/6 py-8 px-5">
            <SwapHeader setIsSwapActive={setIsSwapActive} />
            <SwapForm />
        </div>
    );
}

export default SwapContainer;
