import React, { ReactElement } from 'react';
import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import { requestInvoicingUrl } from '@src/constants/request.constants';
import { useTranslation } from 'react-i18next';

interface IProps {
    invoiceId: string;
}

export default function RequestInvoicingButton({
    invoiceId,
}: IProps): ReactElement {
    const { t } = useTranslation();
    return (
        <div className="w-full">
            <a
                target="_blank"
                rel="noreferrer"
                href={`${requestInvoicingUrl}/${invoiceId}`}
                className="flex justify-center w-full py-2 my-2 font-semibold text-white rounded-sm bg-indigo-dye"
            >
                {t('myInvoicesContent.viewInvoice')}
            </a>

            <FlexContainer
                direction="flex-row"
                justify="justify-between"
                className="w-full font-light "
            >
                <Text text={t('myInvoicesContent.requestIndication')} />
            </FlexContainer>
        </div>
    );
}
