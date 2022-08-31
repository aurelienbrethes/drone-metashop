import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const contacts = [
    {
        name: 'Twitter',
        href: 'https://twitter.com/MetaShopNetwork',
        icon: '/icons/twitterButton.png',
    },
    {
        name: 'Discord',
        href: 'https://discord.com/invite/rYB67XSteq',
        icon: '/icons/discordButton.webp',
    },
    {
        name: 'Telegram',
        href: `https://t.me/+Or-0VHklR29iMWQ0`,
        icon: '/icons/telegramButton.png',
    },
];

function FooterContacts(): JSX.Element {
    const { t } = useTranslation();
    return (
        <div className="flex my-1 space-x-2 text-sm md:my-2">
            <p className="pt-2">{t('footer.community')} :</p>
            {contacts.map((contact) => (
                <a
                    key={contact.name}
                    target="_blank"
                    rel="noreferrer"
                    href={contact.href}
                >
                    <span className="sr-only">{contact.name}</span>
                    <div className="duration-150 w-7 h-7 md:w-8 md:h-8 hover:scale-110">
                        <Image
                            src={contact.icon}
                            alt={`${contact.name} logo`}
                            layout="responsive"
                            width={25}
                            height={25}
                        />
                    </div>
                </a>
            ))}
        </div>
    );
}

export default FooterContacts;
