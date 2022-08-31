import React from 'react';
import Image from 'next/image';
import useAppState from '@src/hooks/useAppState';
import { useTranslation } from 'react-i18next';
import BuyButton from '@components/UI/BuyButton';

const FirstSection = (): JSX.Element => {
    const { allProducts } = useAppState();
    const { t } = useTranslation();

    return (
        <div
            id="home"
            className={`flex flex-col items-center space-y-10 pt-20 sm:pt-36 bg-[url('/images/firstBackground.svg')] bg-contain bg-center bg-no-repeat my-24`}
        >
            {allProducts.length && (
                <h1
                    className="text-3xl font-black tracking-widest text-center sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                    id="main-title"
                >
                    {allProducts[0].name}
                </h1>
            )}
            <h2 className="text-xl font-semibold sm:text-4xl md:text-5xl lg:text-7xl font-poppins">
                {t('firstSection.title2')}
            </h2>
            {allProducts.length && (
                <div className="px-12 ">
                    <Image
                        src={allProducts[0].images[0].src}
                        width={500}
                        height={300}
                    />
                </div>
            )}

            {allProducts.length && (
                <h2 className="text-2xl font-semibold sm:text-3xl md:text-5xl lg:text-7xl font-poppins">
                    {`${allProducts[0].price} €`}
                </h2>
            )}

            <div className="flex flex-col items-center">
                <p className="text-sm font-semibold sm:text-lg md:text-3xl">
                    {t('firstSection.desc1')}
                </p>
                <p className="px-10 text-sm text-center sm:text-xl md:text-2xl">
                    {t('firstSection.desc2')}
                </p>
            </div>
            <div className="flex justify-center w-full lg:pt-6 xl:pt-14 ">
                <BuyButton
                    spanClass="relative px-8 py-5 transition-all ease-in duration-30 w-60 sm:w-72 bg-zinc-800 rounded-md group-hover:bg-opacity-0"
                    buttonClass="relative p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded group bg-gradient-to-br from-purple-700 to-blue-700 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                />
            </div>
        </div>
    );
};

export default FirstSection;
