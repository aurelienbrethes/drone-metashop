/* eslint-disable react/jsx-props-no-spreading */
import { IFormData } from '@src/interfaces/form';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IProps {
    label: string;
    className?: string;
    value: string;
    register?: UseFormRegister<IFormData & FieldValues>;
    children?: JSX.Element;
    handleChange?: (e: Event) => void;
    disabled?: boolean;
}

export default function CheckboxInput({
    label,
    className,
    value,
    register,
    children,
    handleChange,
    disabled,
}: IProps): JSX.Element {
    return (
        <div className={className || ''}>
            <label
                htmlFor={label}
                className="block text-sm font-medium text-white"
            >
                <input
                    type="checkbox"
                    id={label}
                    {...(register && register(value))}
                    className="w-6 h-6 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-none focus:ring-transparent focus sm:text-sm bg-isabelline"
                    onChange={(e) =>
                        handleChange && handleChange(e as unknown as Event)
                    }
                    disabled={disabled}
                />{' '}
                {label} {children}
            </label>
        </div>
    );
}
