import React from 'react';
import { useTranslation } from 'react-i18next';
import FlexContainer from '@components/UI/FlexContainer';
import FooterContacts from './FooterContacts';
import FooterCopyright from './FooterCopyright';
import FooterPartners from './FooterPartners';
import FooterText from './FooterText';

const dcinfos = {
    company: 'Digital Copilote',
    logo: '/images/dc-logo.png',
    url: 'https://www.digitalcopilote.io/',
};

function Footer(): JSX.Element {
    const { t } = useTranslation();
    return (
        <footer className="flex flex-col items-center w-full px-4 bg-neutral-900 sm:px-0 lg:text-lg">
            <FlexContainer
                direction="flex-row"
                justify="justify-between"
                className="h-full py-4 align-middle border-white sm:w-4/5 sm:border-t sm:mt-12 md:py-4"
            >
                <FlexContainer
                    direction="flex-col"
                    justify="justify-around"
                    className="w-full h-full pr-2 text-white"
                >
                    <FooterText>{t('footer.description1')}</FooterText>
                    <FooterText>{t('footer.description2')}</FooterText>
                </FlexContainer>
                <FooterPartners />
            </FlexContainer>
            <FlexContainer
                direction="flex-row"
                justify="justify-between"
                className="w-full py-2 text-white border-white sm:border-b items-left sm:w-4/5"
            >
                <FooterContacts />
            </FlexContainer>
            <FlexContainer
                direction="flex-row"
                justify="justify-between"
                className="items-center w-full py-2 sm:w-4/5 md:py-6"
            >
                <FooterText>{t('footer.expedition')}</FooterText>
                <FooterCopyright
                    logo={dcinfos.logo}
                    url={dcinfos.url}
                    metadata={dcinfos.company}
                >
                    {t('footer.copyright')}
                </FooterCopyright>
            </FlexContainer>
        </footer>
    );
}

export default Footer;
