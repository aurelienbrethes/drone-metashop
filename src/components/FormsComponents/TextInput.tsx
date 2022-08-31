/* eslint-disable react/jsx-props-no-spreading */
import hasValidationErrors from '@utils/hook-form-errors';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IFormData, IFormErrors } from 'src/interfaces/form';

interface IProps {
    label: string;
    value: string;
    className?: string;
    register: UseFormRegister<IFormData & FieldValues>;
    errors: IFormErrors;
    errorMessage: string;
}

export default function TextInput({
    label,
    value,
    className,
    register,
    errors,
    errorMessage,
}: IProps): JSX.Element {
    const hasErrors = hasValidationErrors(value, errors);
    return (
        <div className={className || ''}>
            <label
                htmlFor={label}
                className="block text-sm font-medium text-white"
            >
                {label}
                <input
                    type="text"
                    id={label}
                    {...register(value)}
                    className="block w-full px-3 py-2 mt-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm bg-isabelline"
                />
                {hasErrors && <p className="text-red-700">{errorMessage}</p>}
            </label>
        </div>
    );
}
