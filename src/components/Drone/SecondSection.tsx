import React from 'react';
import Image from 'next/image';
import classNames from '@utils/tailwind';
import useAppState from '@src/hooks/useAppState';
import { useTranslation } from 'react-i18next';
import Battery from './img/secondSection-img/icon-battery.svg';
import Camera from './img/secondSection-img/icon-camera.svg';
import Shot from './img/secondSection-img/icon-shot.svg';
import Follow from './img/secondSection-img/icon-follow.svg';
import Wifi from './img/secondSection-img/icon-wifi.svg';
import Gps from './img/secondSection-img/icon-gps.svg';
import Map from './img/secondSection-img/icon-map.svg';
import Compass from './img/secondSection-img/icon-compass.svg';
import Arrow from './img/secondSection-img/icon-arrow.svg';
import Phone from './img/secondSection-img/icon-phone.svg';
import Finger from './img/secondSection-img/icon-finger.svg';
import Pic from './img/secondSection-img/icon-image.svg';
import ThreeSixZero from './img/secondSection-img/icon-360.svg';
import Click from './img/secondSection-img/icon-click.svg';

const icons = [
    {
        id: 0,
        image: Click,
        text: 'Icon1',
        class: 'col-start-1 col-end-2',
    },
    {
        id: 1,
        image: Battery,
        text: 'Icon2',
        class: 'col-start-2 col-end-3',
    },
    {
        id: 2,
        image: Shot,
        text: 'Icon3',
        class: 'col-start-3 col-end-4',
    },
    {
        id: 3,
        image: Camera,
        text: 'Icon4',
        class: 'col-start-4 col-end-5',
    },
    {
        id: 4,
        image: ThreeSixZero,
        text: 'Icon5',
        class: 'col-start-5 col-end-6',
    },
    {
        id: 5,
        image: Follow,
        text: 'Icon6',
        class: 'col-start-6 col-end-7',
    },
    {
        id: 6,
        image: Pic,
        text: 'Icon7',
        class: 'col-start-7 col-end-8',
    },
    {
        id: 7,
        image: Wifi,
        text: 'Icon8',
        class: 'row-start-2 col-start-1 col-end-2',
    },
    {
        id: 8,
        image: Finger,
        text: 'Icon9',
        class: 'row-start-2 col-start-2 col-end-3',
    },
    {
        id: 9,
        image: Gps,
        text: 'Icon10',
        class: 'row-start-2 col-start-3 col-end-4',
    },
    {
        id: 10,
        image: Phone,
        text: 'Icon11',
        class: 'row-start-2 col-start-4 col-end-5',
    },
    {
        id: 11,
        image: Arrow,
        text: 'Icon12',
        class: 'row-start-2 col-start-5 col-end-6',
    },
    {
        id: 12,
        image: Compass,
        text: 'Icon13',
        class: 'row-start-2 col-start-6 col-end-7',
    },
    {
        id: 13,
        image: Map,
        text: 'Icon14',
        class: 'row-start-2 col-start-7 col-end-8',
    },
];

function SecondSection(): JSX.Element {
    const { allProducts } = useAppState();
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center bg-[url('/images/backgroundBicolor.svg')] bg-cover bg-center bg-no-repeat">
            <h2 className="mx-2 text-lg text-center section-title md:mt-40 sm:text-3xl md:text-5xl lg:text-6xl">
                {t('secondSection.title')}
            </h2>
            <p className="mx-16 mt-12 text-sm text-center sm:text-xl">
                {t('secondSection.description')}
            </p>
            <div className="px-4 pt-10 ">
                {allProducts.length && (
                    <Image
                        src={allProducts[0].images[2].src}
                        width={600}
                        height={500}
                    />
                )}
            </div>
            <div className="flex flex-wrap justify-around px-10 mt-8 gap-y-6 lg:grid md:w-auto lg:grid-cols-7 lg:grid-rows-2 ">
                {icons.map((icon) => (
                    <div
                        key={icon.id}
                        className={classNames(
                            `flex flex-col items-center w-24 pt-2 lg:${icon.class} md:w-36`,
                        )}
                    >
                        <Image src={icon.image} width={50} height={50} />
                        <p className="w-24 pt-2 text-xs text-center sm:text-sm md:text-base md:w-36">
                            {t(`secondSection.text${icon.text}`)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SecondSection;
