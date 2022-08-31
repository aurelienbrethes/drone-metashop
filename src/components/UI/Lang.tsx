import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import en from '../../../public/images/uk.png';
import fr from '../../../public/images/france.png';

const langArray = [
    {
        id: '1',
        tag: 'fr',
        flag: fr,
    },
    {
        id: '2',
        tag: 'en',
        flag: en,
    },
];

const Lang = () => {
    const { i18n } = useTranslation();

    const handleSetLanguage = (
        event: React.MouseEvent<HTMLDivElement>,
        langTag: string,
    ) => {
        event?.stopPropagation();
        i18n.changeLanguage(langTag);
    };

    return (
        <div className="absolute flex justify-between cursor-pointer w-14 top-20 right-4 sm:right-auto sm:left-4 lg:top-10">
            {langArray.map((language) => (
                <div
                    key={language.id}
                    role="presentation"
                    className={
                        i18next.language === language.tag
                            ? 'sepia0'
                            : 'grayscale'
                    }
                    onClick={(e) => handleSetLanguage(e, language.tag)}
                >
                    <Image src={language.flag} width={25} height={25} />
                </div>
            ))}
        </div>
    );
};

export default Lang;
