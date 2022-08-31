import { CheckboxInput } from '@components/FormsComponents';
import NavPagesLink from '@components/UI/NavPagesLink';
import { LegalPageSlug } from '@src/constants/legal-infos-pages.constants';
import { MiscFormKeys } from '@src/interfaces/form';
import { useTranslation } from 'react-i18next';

interface IProps {
    handleOnChange: () => void;
    disabled?: boolean;
}

export default function LegalApproveInput({
    handleOnChange,
    disabled,
}: IProps): JSX.Element {
    const { t } = useTranslation();

    return (
        <CheckboxInput
            label={t('orderForm.legal-approvement')}
            value={MiscFormKeys.AGREEDTO}
            className="text-center"
            handleChange={() => handleOnChange()}
            disabled={disabled}
        >
            <>
                <NavPagesLink
                    href={`/legal-infos/${LegalPageSlug.TERMS_CONDITIONS_PAGE_SLUG}`}
                    className="text-sky-800"
                    target="_blank"
                >
                    {t('orderForm.terms-conditions')}
                </NavPagesLink>
                <NavPagesLink
                    href={`/legal-infos/${LegalPageSlug.PRIVACY_POLICY_PAGE_SLUG}`}
                    className="text-sky-800"
                    target="_blank"
                    prefixLink={() => (
                        <span>{t('orderForm.prefix-privacy-policy')}</span>
                    )}
                >
                    {t('orderForm.privacy-policy')}
                </NavPagesLink>
            </>
        </CheckboxInput>
    );
}
