import React, { ReactNode } from 'react';

interface IProps {
    heading: 'h2' | 'h3' | 'h4' | 'h5';
    children: ReactNode;
    className?: string;
}

export default function SubTitle({
    heading,
    children,
    className,
}: IProps): JSX.Element {
    const subTitle = React.createElement(heading, { className }, children);
    return subTitle;
}
