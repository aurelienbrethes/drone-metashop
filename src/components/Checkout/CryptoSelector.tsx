/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Image from 'next/image';
import TokenListModal from './TokenListModal';

interface IProps {
    tokensList: IToken[];
    tokenSelected: IToken;
    setTokenSelected: (payload: IToken) => { payload: IToken; type: string };
    className?: string;
}

function CryptoSelector({
    tokensList,
    tokenSelected,
    setTokenSelected,
    className,
}: IProps): JSX.Element {
    const [isModal, setIsModal] = useState(false);

    return (
        <>
            {isModal && (
                <TokenListModal
                    tokensList={tokensList}
                    isModal={isModal}
                    setIsModal={setIsModal}
                    setTokenSelected={setTokenSelected}
                />
            )}
            <button
                onClick={() => setIsModal(true)}
                type="button"
                className={`flex items-center bg-white py-1 px-4 rounded-md ${
                    className || ''
                }`}
            >
                {/* NB: Cannot use Image component du to unsupported domains */}
                <img
                    src={tokenSelected.logoURI}
                    height={20}
                    width={20}
                    alt={tokenSelected.name}
                />
                <p className="ml-2 mr-4 text-gray-900">
                    {tokenSelected.symbol}
                </p>
                <Image src="/images/downArrow.png" height={8} width={15} />
            </button>
        </>
    );
}

export default CryptoSelector;
