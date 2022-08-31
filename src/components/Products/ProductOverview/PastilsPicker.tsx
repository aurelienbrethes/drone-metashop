import React from 'react';
import { RadioGroup } from '@headlessui/react';
import Image from 'next/image';
import { ISelectedOption } from '@src/hooks/useVariants';
import classNames from '@utils/tailwind';

interface IProps {
    option: ISelectedOption;
    isSelected: boolean;
    term: OptionMetas;
}

function PastilsPicker({ isSelected, option, term }: IProps): JSX.Element {
    return (
        <>
            <RadioGroup.Option
                value={option}
                className={({ active, checked }) =>
                    classNames(
                        isSelected ? 'ring ring-gray-400 ring-offset-1' : '',
                        !active && checked ? 'ring-2' : '',
                        'relative p-0.5 m-1 rounded-full border border-black flex items-center justify-center cursor-pointer focus:outline-none',
                    )
                }
            >
                {term.type === 'photo' ? (
                    <Image
                        src={term.image.url}
                        layout="fixed"
                        width={50}
                        height={50}
                        objectFit="contain"
                    />
                ) : (
                    <span
                        style={{
                            backgroundColor: term.color || '#FFFFFF',
                        }}
                        className="h-8 w-8 border-2 border-black border-opacity-20 rounded-full"
                    />
                )}
            </RadioGroup.Option>
        </>
    );
}

export default PastilsPicker;
