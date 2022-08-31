import useAppState from '@src/hooks/useAppState';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

interface IProps {
    width: number;
    height: number;
}

export default function SiteLogo({ width, height }: IProps): ReactElement {
    const { siteLogoUrl } = useAppState();
    return (
        <Link href="/shop" passHref>
            <a className="mr-4" href="replace">
                <Image
                    className="cursor-pointer"
                    src={siteLogoUrl || '/images/logo.png'}
                    width={width}
                    height={height}
                />
            </a>
        </Link>
    );
}
