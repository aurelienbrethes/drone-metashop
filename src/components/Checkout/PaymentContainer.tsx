/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from 'react';
import { giveErc20Allowance } from '@matthias_wanner/web3_utils';
import { useMetaMask } from 'metamask-react';
import classNames from '@utils/tailwind';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';
import useAllowanceState from '@src/hooks/useAllowanceState';
import MetamaskButton from './MetamaskButton';
import MetamaskAnimation from './MetamaskAnimation';
import ApproveButton from './ApproveButton';
import PaymentHeader from './PaymentHeader';

import CryptoInput from './CryptoInput';
import SwapContainer from './SwapContainer';
import CurrencyBalance from './CurrencyBalance';
import InsufficientFunds from './InsufficientFunds';
import SwitchNetworkBanner from './SwitchNetworkBanner';

interface IProps {
    spenderAddress: string | null;
    amount: number;
    handlePay: () => void;
}

export default function PaymentContainer({
    spenderAddress,
    amount,
    handlePay,
}: IProps): ReactElement {
    const [isSwapActive, setIsSwapActive] = useState(false);

    const { account } = useMetaMask();
    const { cryptoSelected, customerCheckoutBalance } = useCheckoutFromStore();

    const { isAllowed, setIsAllowed } = useAllowanceState(
        cryptoSelected.address,
        spenderAddress,
        amount,
    );

    const getContainerClasses = (): string =>
        isSwapActive ? 'w-full md:w-9/12' : 'w-full md:w-6/12';

    return (
        <>
            <SwitchNetworkBanner className={getContainerClasses()} />
            <div
                className={`border-2 w-full border-gray-200 rounded-lg flex flex-col-reverse md:flex-row overflow-hidden ${getContainerClasses()} `}
            >
                <div
                    className={`flex flex-col items-center py-8 w-full ${
                        isSwapActive
                            ? 'md:w-6/12 items-start px-5'
                            : 'items-center text-center px-5'
                    }`}
                >
                    <PaymentHeader
                        isSwapActive={isSwapActive}
                        setIsSwapActive={setIsSwapActive}
                    />
                    <CryptoInput />
                    <CurrencyBalance mode="pay" tokenInfos={cryptoSelected} />
                    {customerCheckoutBalance < amount && (
                        <InsufficientFunds tokenInfos={cryptoSelected} />
                    )}
                    <MetamaskAnimation />

                    <ApproveButton
                        spenderAddress={spenderAddress}
                        tokenContractAddress={cryptoSelected.address}
                        endHandler={() => setIsAllowed(true)}
                        amount={amount / 10 ** cryptoSelected.decimals}
                        enabled={!!account && !!spenderAddress && !isAllowed}
                        approveHandler={giveErc20Allowance}
                        className={classNames(
                            ` mt-3 w-full rounded-md px-4 shadow-sm py-2 font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                !!account && !!spenderAddress && !isAllowed
                                    ? `text-white focus:ring-blue-900 bg-blue-sapphire hover:bg-indigo-dye`
                                    : `text-gray-400 bg-gray-200`
                            }`,
                        )}
                    />
                    <MetamaskButton
                        disabled={
                            !isAllowed || customerCheckoutBalance < amount
                        }
                        handleClick={handlePay}
                    />
                </div>
                {isSwapActive && (
                    <SwapContainer setIsSwapActive={setIsSwapActive} />
                )}
            </div>
        </>
    );
}
