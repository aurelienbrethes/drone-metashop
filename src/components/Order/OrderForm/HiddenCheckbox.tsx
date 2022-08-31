/* eslint-disable react/jsx-props-no-spreading */
import { IFormData } from '@src/interfaces/form';
import React, { forwardRef } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface IProps {
    value: string;
    setValue: UseFormSetValue<IFormData & FieldValues>;
    register: UseFormRegister<IFormData & FieldValues>;
}

const HiddenCheckbox = forwardRef<HTMLInputElement, IProps>(
    ({ value, setValue, register }, ref) => (
        <input
            id={value}
            type="checkbox"
            className="hidden"
            {...register(value)}
            ref={ref}
            onChange={(e) => {
                setValue(value, e.target.checked);
            }}
        />
    ),
);

export default HiddenCheckbox;
