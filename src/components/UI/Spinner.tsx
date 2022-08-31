import COLORS from '@constants/spinner.colors.constants';
import classNames from '@utils/tailwind';
import React from 'react';

interface IProps {
    text?: string;
    width?: string;
    spinnerColor?: COLORS;
}

export default function Spinner({
    text,
    width,
    spinnerColor = COLORS.WHITE,
}: IProps): JSX.Element {
    return (
        <div className="grid w-full h-full place-items-center">
            <div className="flex flex-col items-center space-y-10">
                {text && <p className="py-4 text-lg text-white">{text}</p>}
                <svg
                    className={classNames(
                        `animate-spin w-${width || 20} text-center`,
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke={spinnerColor}
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill={spinnerColor}
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
        </div>
    );
}
