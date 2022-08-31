/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ForwardedRef, forwardRef } from 'react';

interface IProps {
    handleClick: () => void;
}

const HiddenButton = forwardRef(
    ({ handleClick }: IProps, ref: ForwardedRef<HTMLButtonElement>) => (
        <button
            type="submit"
            className="hidden"
            ref={ref}
            onClick={handleClick}
        />
    ),
);

export default HiddenButton;
