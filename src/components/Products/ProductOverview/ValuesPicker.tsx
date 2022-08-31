import React from 'react';
import { RadioGroup } from '@headlessui/react';
import classNames from '@utils/tailwind';
import { ISelectedOption } from '@src/hooks/useVariants';

interface IProps {
    option: ISelectedOption;
    isSelected: boolean;
}

function ValuesPicker({ option, isSelected }: IProps): JSX.Element {
    return (
        <>
            <RadioGroup.Option
                value={option}
                className={() =>
                    classNames(
                        isSelected
                            ? 'bg-white border-blue-500 text-black hover:bg-gray-50'
                            : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                        'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer',
                    )
                }
            >
                <RadioGroup.Label as="p">{option.optionValue}</RadioGroup.Label>
            </RadioGroup.Option>
        </>
    );
}

export default ValuesPicker;
