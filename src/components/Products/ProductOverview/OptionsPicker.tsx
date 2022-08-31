import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { ISelectedOption, OnChangeOptionHandler } from '@src/hooks/useVariants';
import ValuesPicker from './ValuesPicker';
import PastilsPicker from './PastilsPicker';

interface IProps {
    productOptions: ICustomAttribute[];
    selectedOptions: ISelectedOption[];
    handleChange: OnChangeOptionHandler;
}

function OptionsPicker({
    productOptions,
    selectedOptions,
    handleChange,
}: IProps) {
    return (
        <>
            {productOptions.map((option) => (
                <div key={option.id} className="pt-6 md:pt-8">
                    <h3 className="text-sm lg:text-base text-gray-600">
                        {option.label}
                    </h3>
                    <RadioGroup
                        value={selectedOptions.find(
                            (o) =>
                                o.optionName.toLowerCase() ===
                                option.label.toLowerCase(),
                        )}
                        onChange={handleChange}
                        className="mt-2 py-2"
                    >
                        <RadioGroup.Label className="sr-only">
                            Choose a {option.label}
                        </RadioGroup.Label>
                        <div className="flex flex-wrap items-center">
                            {option.terms.map((term) => {
                                const value = {
                                    optionName: option.label,
                                    optionValue: term.name,
                                };

                                const isSelected =
                                    term.name.toLowerCase() ===
                                    selectedOptions
                                        .find(
                                            (o) =>
                                                o.optionName.toLowerCase() ===
                                                option.label.toLowerCase(),
                                        )
                                        ?.optionValue.toLowerCase();

                                if (term.metas) {
                                    return (
                                        <PastilsPicker
                                            key={term.id}
                                            option={value}
                                            isSelected={isSelected}
                                            term={term.metas}
                                        />
                                    );
                                }
                                return (
                                    <ValuesPicker
                                        key={term.id}
                                        option={value}
                                        isSelected={isSelected}
                                    />
                                );
                            })}
                        </div>
                    </RadioGroup>
                </div>
            ))}
        </>
    );
}

export default OptionsPicker;
