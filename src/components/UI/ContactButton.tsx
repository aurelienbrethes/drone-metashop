import useAppState from '@src/hooks/useAppState';
import { useTranslation } from 'react-i18next';

const ContactButton = () => {
    const { dispatchToggleCart, dispatchInsideModal } = useAppState();
    const { t } = useTranslation();

    // Open modal contact
    const handleOpenContact = () => {
        dispatchToggleCart();
        dispatchInsideModal('contact');
    };

    return (
        <div
            role="presentation"
            className="pt-2 -ml-10 duration-300 ease-in-out cursor-pointer sm:ml-0 sm:pt-0 hover:translate-y-1"
            onClick={() => handleOpenContact()}
        >
            {t('navBar.labelContact')}
        </div>
    );
};

export default ContactButton;
