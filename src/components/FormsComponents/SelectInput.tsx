/* eslint-disable react/jsx-props-no-spreading */
import hasValidationErrors from '@utils/hook-form-errors';
import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { IFormData, IFormErrors } from 'src/interfaces/form';

export interface ISelectOption {
    value: string;
    label: string;
}

interface IProps {
    options: ISelectOption[];
    value: string;
    label: string;
    className?: string;
    labelClassName?: string;
    register: UseFormRegister<IFormData & FieldValues>;
    errors: IFormErrors;
    errorMessage: string;
    defaultValue?: string;
}

export default function SelectInput({
    label,
    options,
    value,
    className,
    labelClassName,
    register,
    errors,
    errorMessage,
    defaultValue,
}: IProps): JSX.Element {
    const hasErrors = hasValidationErrors(value, errors);
    return (
        <div className={className || ''}>
            <label htmlFor={label} className={labelClassName || ''}>
                {label}
                <select
                    id={label}
                    {...register(value)}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                    defaultValue={defaultValue || ''}
                >
                    {options.map(({ label: option, value: optionValue }) => (
                        <option key={option} value={optionValue}>
                            {option}
                        </option>
                    ))}
                </select>
                {hasErrors && <p className="text-red-700">{errorMessage}</p>}
            </label>
        </div>
    );
}
