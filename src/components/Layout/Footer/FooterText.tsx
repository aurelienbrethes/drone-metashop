import React from 'react';

interface IProps {
    children: string;
    className?: string;
}

function FooterText({ children, className }: IProps): JSX.Element {
    return (
        <p
            className={
                className ||
                ' text-white text-inter text-sm my-1 md:my-2 text-inter'
            }
        >
            {children}
        </p>
    );
}

export default FooterText;
