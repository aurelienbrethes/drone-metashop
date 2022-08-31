import FlexContainer from '@components/UI/FlexContainer';
import useCartFromStore from '@hooks/useCartFromStore';
import usePrices from '@hooks/usePrices';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PricingDetails() {
    const { totalPrice, cartItems } = useCartFromStore();
    const { t } = useTranslation();

    const {
        currencySymbol,
        computeTotalCartTaxAmount,
        computeTotalPreTaxPrice,
    } = usePrices(totalPrice);

    const totalPreTaxPrice = computeTotalPreTaxPrice(cartItems);
    const totalTaxAmount = computeTotalCartTaxAmount(cartItems);

    const priceItems = [
        {
            id: 1,
            title: `${t('pricing.preTaxPrice')}`,
            amount: totalPreTaxPrice,
        },
        {
            id: 2,
            title: `${t('pricing.tax')}`,
            amount: totalTaxAmount,
        },
        {
            id: 3,
            title: `${t('pricing.taxesIncludedPrice')}`,
            amount: totalPrice,
        },
    ];

    return (
        <div className="w-full py-4">
            {priceItems.map((item) => (
                <FlexContainer
                    key={item.id}
                    direction="flex-row"
                    justify="justify-between"
                    className="py-1 text-sm"
                >
                    <span>{item.title}</span>
                    <span>
                        {item.amount}
                        {currencySymbol}
                    </span>
                </FlexContainer>
            ))}
        </div>
    );
}

export default PricingDetails;
