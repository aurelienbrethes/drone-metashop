import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const partners = [
    {
        name: 'Request',
        logo: '/images/request-logo.svg',
        url: 'https://request.network/',
    },
    {
        name: 'Jarvis',
        logo: '/images/jarvis.svg',
        url: 'https://jarvis.network/',
    },
];

function FooterPartners(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col justify-start w-1/2 px-4 border-l md:w-1/4 sm:w-1/3">
            <p className="text-sm text-white">{t('footer.partners')}:</p>
            <div className="flex flex-row justify-start space-x-4">
                {partners.map((partner) => (
                    <div
                        key={`${partner.name}-${partner.logo}`}
                        className="pt-3 md:pt-4"
                    >
                        <span className="sr-only">{partner.name}</span>
                        <a href={partner.url} target="_blank" rel="noreferrer">
                            <div className="w-6 h-6 duration-150 md:w-9 md:h-9 hover:scale-110">
                                <Image
                                    src={partner.logo}
                                    alt={`${partner.name}-${partner.logo}`}
                                    layout="responsive"
                                    width={35}
                                    height={35}
                                />
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FooterPartners;
