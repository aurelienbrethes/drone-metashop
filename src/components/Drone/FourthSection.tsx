import React from 'react';
import Image from 'next/image';
import useAppState from '@src/hooks/useAppState';
import { useTranslation } from 'react-i18next';
import remoteEn from './img/fourthSection-img/remoteEn.png';
import manetteFr from './img/fourthSection-img/manetteFr.png';

const characteristics = [
    {
        id: 1,
        text: 'Charac1',
    },
    {
        id: 2,
        text: 'Charac2',
    },
    {
        id: 3,
        text: 'Charac3',
    },
    {
        id: 4,
        text: 'Charac4',
    },
    {
        id: 5,
        text: 'Charac5',
    },
    {
        id: 6,
        text: 'Charac6',
    },
    {
        id: 7,
        text: 'Charac7',
    },
    {
        id: 8,
        text: 'Charac8',
    },
    {
        id: 9,
        text: 'Charac9',
    },
    {
        id: 10,
        text: 'Charac10',
    },
    {
        id: 11,
        text: 'Charac11',
    },
];

function FourthSection(): JSX.Element {
    const { allProducts } = useAppState();
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    return (
        <div
            id="characteristics"
            className="flex flex-col items-center mt-12 md:mt-28 bg-[url('/images/backgroundBicolor.svg')] bg-cover bg-center bg-no-repeat"
        >
            <h2 className="text-lg text-center section-title sm:text-3xl md:text-5xl lg:text-6xl">
                {t('fourthSection.title')}
            </h2>
            {allProducts.length && (
                <div className="flex flex-col items-center justify-around w-full px-8 my-6 md:px-12 md:flex-row ">
                    <Image
                        src={allProducts[0].images[3].src}
                        width={600}
                        height={500}
                    />
                    <Image
                        src={allProducts[0].images[4].src}
                        width={600}
                        height={500}
                    />
                </div>
            )}
            <div className="mt-6 md:hidden">
                {allProducts.length && (
                    <Image
                        src={allProducts[0].images[6].src}
                        width={500}
                        height={400}
                    />
                )}
            </div>
            <div className="text-sm text-center text-white sm:text-lg md:hidden">
                {characteristics.map((characteristic) => (
                    <div key={characteristic.id}>
                        <p>
                            {characteristic.id} :
                            {t(`fourthSection.text${characteristic.text}`)}
                        </p>
                    </div>
                ))}
            </div>
            <div className="hidden md:mt-8 md:px-6 md:w-full md md:flex md:justify-center">
                <div className={i18n.language === 'fr' ? '' : 'hidden'}>
                    <Image src={manetteFr} width={1200} height={600} />
                </div>
                <div className={i18n.language === 'en' ? '' : 'hidden'}>
                    <Image src={remoteEn} width={1200} height={600} />
                </div>
            </div>
        </div>
    );
}

export default FourthSection;
