import Image from 'next/image';
import { Tab } from '@headlessui/react';

import classNames from '@utils/tailwind';

interface Iprops {
    images: TSimplifiedImage[];
    placeholder?: string;
}

function ProductImages({ images, placeholder }: Iprops): JSX.Element {
    return (
        <Tab.Group as="div" className="flex flex-col-reverse max-w-lg">
            <div className="mt-6 w-full  max-w-2xl mx-auto sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6 py-4">
                    {images.length ? (
                        images.map((image) => (
                            <Tab
                                key={image.id}
                                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none"
                            >
                                {({ selected }) => (
                                    <>
                                        <span className="sr-only">
                                            {image.name}
                                        </span>
                                        <span className="relative w-full h-full rounded-md overflow-hidden">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                placeholder="blur"
                                                blurDataURL={placeholder}
                                                layout="fill"
                                                objectFit="contain"
                                                priority
                                            />
                                        </span>
                                        <span
                                            className={classNames(
                                                selected
                                                    ? 'ring-blue-500'
                                                    : 'ring-transparent',
                                                'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none',
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </Tab>
                        ))
                    ) : (
                        <Image
                            src="/images/product_placeholder.png"
                            alt="placeholder"
                            placeholder="blur"
                            blurDataURL="/images/product_placeholder.png"
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                    )}
                </Tab.List>
            </div>

            <Tab.Panels className="relative w-full aspect-w-1 aspect-h-1">
                {images.map((image) => (
                    <Tab.Panel key={image.id}>
                        <Image
                            src={image.src}
                            placeholder="blur"
                            blurDataURL={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
}

export default ProductImages;
