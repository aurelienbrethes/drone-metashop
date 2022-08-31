import Button from '@components/UI/Button';
import { useTranslation } from 'react-i18next';
import FlexContainer from '@components/UI/FlexContainer';
import Text from '@components/UI/Text';
import { useRouter } from 'next/router';

import React, { ReactElement } from 'react';

interface Props {
    price: string;
}

export default function InvoiceCheckoutButton({ price }: Props): ReactElement {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <Button
                handleClick={() => router.push(`/payment-swap`)}
                className="bg-indigo-dye my-2 w-full text-white font-semibold py-2 rounded-sm"
            >
                {t('myInvoices.checkoutButton')}
            </Button>
            <FlexContainer
                direction="flex-row"
                justify="justify-between"
                className="w-full font-semibold "
            >
                <Text text="Total" />
                <Text text={`${price}`} />
            </FlexContainer>
        </div>
    );
}
