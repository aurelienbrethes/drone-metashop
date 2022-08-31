import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper';
import 'swiper/css';

import 'swiper/css/pagination';

interface IImages {
    id: number;
    src: StaticImageData | string;
    class: string;
}

const images: IImages[] = [
    {
        id: 1,
        src: "bg-[url('/images/drone1.webp')]",
        class: 'col-start-1 col-end-3 row-start-1 row-end-2 lg:place-self-end',
    },
    {
        id: 2,
        src: "bg-[url('/images/video.gif')]",
        class: 'col-span-4 col-start-3 row-span-2 row-end-2',
    },
    {
        id: 3,
        src: "bg-[url('/images/drone3.webp')]",
        class: 'col-start-2 col-end-3 row-start-2 row-end-3',
    },
    {
        id: 4,
        src: "bg-[url('/images/drone4.png')]",
        class: 'col-start-3 col-end-6 row-span-3 row-start-2',
    },
];

const Carousel = () => (
    <Swiper
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        pagination={{ clickable: true }}
        cssMode
        navigation
        mousewheel
        keyboard
        className="flex items-center justify-center w-screen my-20 sm:hidden"
    >
        {images.map((image) => (
            <SwiperSlide className="flex justify-center " key={image.id}>
                <div
                    className={` ${image.src}  bg-center bg-contain w-full bg-no-repeat h-52`}
                >
                    <p className="hidden">carousel drone</p>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
);

export default Carousel;
