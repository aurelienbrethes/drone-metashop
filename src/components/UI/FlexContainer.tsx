import React, { ReactElement } from 'react';

interface IProps {
    children: ReactElement | ReactElement[];
    direction: 'flex-row' | 'flex-col';
    justify:
        | 'justify-around'
        | 'justify-center'
        | 'justify-between'
        | 'justify-start'
        | 'justify-end';
    className?: string;
}

export default function FlexContainer({
    children,
    justify,
    direction,
    className,
}: IProps): ReactElement {
    return (
        <div
            className={`flex align-middle ${justify} ${direction} ${className}`}
        >
            {children}
        </div>
    );
}
