import React from 'react';
import Image from 'next/image';
import drone1 from '../../../public/images/drone1.webp';
import drone3 from '../../../public/images/drone3.webp';
import drone4 from '../../../public/images/drone4.png';
import Carousel from './Carousel';

const ThirdSection = () => (
    <div
        className="flex items-center justify-center w-full pt-5 sm:px-10 sm:mt-36"
        id="images"
    >
        <div className="w-full hidden sm:grid grid-cols-6 grid-rows-2 gap-4  bg-[url('/images/firstBackground.svg')] bg-contain bg-center bg-no-repeat">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 place-self-end">
                <Image src={drone1} width={350} height={535} />
            </div>
            <div className="flex items-end col-span-4 col-start-3 row-span-2 row-end-2">
                <Image src="/images/video.gif" width={950} height={540} />
            </div>

            <div className="col-start-2 col-end-3 row-start-2 row-end-3">
                <Image src={drone3} />
            </div>

            <div className="col-start-3 col-end-6 row-span-3 row-start-2">
                <Image src={drone4} />
            </div>
        </div>
        <Carousel />
    </div>
);

export default ThirdSection;
