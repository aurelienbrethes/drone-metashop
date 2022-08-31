import React, { ReactElement } from 'react';

interface IProps {
    text: string;
    className?: string;
}

export default function Title({ text, className }: IProps): ReactElement {
    return (
        <h1
            className={`w-full text-center font-bold text-2xl sm:text-4xl md:text-6xl ${
                className || ''
            }`}
        >
            {text}
        </h1>
    );
}
