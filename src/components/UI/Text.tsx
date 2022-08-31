import React, { ReactElement } from 'react';

interface IProps {
    text: string;
    className?: string;
    textSize?: string;
}

export default function Text({
    text,
    className,
    textSize,
}: IProps): ReactElement {
    return (
        <div
            className={`${className || ''} ${
                textSize || 'text-sm  md:text-base'
            } `}
        >
            {text}
        </div>
    );
}
