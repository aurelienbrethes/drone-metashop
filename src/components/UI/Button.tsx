import React from 'react';

interface IProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

export default function Button({
    children,
    className,
    type,
    disabled = false,
    handleClick,
}: IProps): JSX.Element {
    return (
        <button
            disabled={disabled}
            type={type === 'submit' ? 'submit' : 'button'}
            className={className || ''}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
