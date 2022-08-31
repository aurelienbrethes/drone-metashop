import React from 'react';
import parse from 'html-react-parser';

interface IProps {
    content: string;
}

function WooProductDescriptionParser({ content }: IProps): JSX.Element {
    return <> {parse(content)} </>;
}

export default WooProductDescriptionParser;
