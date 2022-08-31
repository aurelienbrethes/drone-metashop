import router from 'next/router';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import leftArrow from '../../../public/icons/Vector.png';

const BackButton = () => {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            className="absolute flex w-64 px-4 py-2 align-middle rounded top-4 left-4"
            onClick={() => {
                router.push('/');
            }}
        >
            <Image
                src={leftArrow}
                className="duration-200 hover:scale-125"
                alt="left arrow"
                layout="fixed"
                width={15}
                height={25}
            />
            <p className="ml-5 duration-300 hover:translate-x-2">
                {t('modalCart.backButton')}
            </p>
        </button>
    );
};

export default BackButton;
