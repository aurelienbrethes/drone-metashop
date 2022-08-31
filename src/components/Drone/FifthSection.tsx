import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import classNames from '@utils/tailwind';
import background5section from './img/background5section1.png';

const characteristics = [
    {
        index: 1,
        text: 'Aerial pixels 4K dual camera',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute md:top-[20%] md:left-[15%] lg:text-xl xl:top-[25%] 2xl:text-2xl',
    },
    {
        index: 2,
        text: 'Expand Size: 34x34x8',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute md:left-1/3 md:top-[36%] lg:text-xl 2xl:text-2xl',
    },
    {
        index: 3,
        text: 'Battery life about 25 minutes',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute md:top-[55%] md:left-[10%] lg:text-xl 2xl:text-2xl ',
    },
    {
        index: 4,
        text: 'Image transmission signal 5G Wifi',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute sm:bottom-[31%] sm:left-[5%] lg:text-xl 2xl:text-2xl',
    },
    {
        index: 5,
        text: 'Body battery Modular lithium battery',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute md:top-[43%] md:right-[10%] lg:text-xl 2xl:text-2xl',
    },
    {
        index: 6,
        text: 'Remote controle distance About 2000 meters',
        class: 'flex justify-center text-sm sm:text-lg sm:text-lg md:text-sm md:absolute sm:right-[15%]  sm:top-[27%] lg:text-xl xl:top-[30%] 2xl:text-2xl',
    },
    {
        index: 7,
        text: 'Folded size : 15x10x8cm',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute sm:bottom-[40%] sm:right-[12%] lg:text-xl 2xl:text-2xl',
    },
    {
        index: 8,
        text: 'Flight system GPS + optical flow positioning',
        class: 'flex justify-center text-sm sm:text-lg md:text-sm md:absolute sm:bottom-1/4 sm:right-[15%] lg:text-xl 2xl:text-2xl',
    },
];

const FifthSection = () => {
    const { t } = useTranslation();

    return (
        <div className="relative mb-20 aspect-1">
            <Image
                priority
                quality={50}
                className=""
                src={background5section}
                layout="responsive"
            />

            {characteristics.map((characteristic) => (
                <div key={characteristic.index}>
                    <p className={classNames(`${characteristic.class}`)}>
                        {t(`fifthSection.textdesc${characteristic.index}`)}
                    </p>
                </div>
            ))}
        </div>
    );
};
export default FifthSection;
