import React from 'react';
import Image from 'next/image';

interface IProps {
    children: string;
    logo: string;
    url: string;
    metadata?: string;
}

function FooterDCInfos({ children, logo, url, metadata }: IProps): JSX.Element {
    return (
        <div className="text-gray-600 duration-150 hover:scale-105">
            <span className="sr-only">{metadata}</span>
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center justify-center text-sm text-white align-middle"
            >
                <span>{children}</span>
                <div className="w-7 h-7 md:w-10 md:h-10">
                    <Image
                        src={logo}
                        alt="Digital Copilote Logo"
                        layout="responsive"
                        width={40}
                        height={40}
                    />
                </div>
            </a>
        </div>
    );
}

export default FooterDCInfos;
