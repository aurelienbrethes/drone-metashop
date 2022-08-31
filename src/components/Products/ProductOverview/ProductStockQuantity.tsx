import React from 'react';
import SubTitle from '@components/UI/SubTitle';
import Text from '@components/UI/Text';
import classNames from '@utils/tailwind';
import FlexContainer from '@components/UI/FlexContainer';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface IProps {
    quantityInStock: number;
    className?: string;
}

function ProductStockQuantity({ quantityInStock, className }: IProps) {
    const { t } = useTranslation();

    return (
        <div className="pt-6 md:pt-8">
            <h3 className="text-sm text-gray-600 lg:text-base">
                {t('productInfo.quantityTitle')}
            </h3>
            <SubTitle heading="h3" className="sr-only">
                {t('productInfo.quantityInStockTitle')}
            </SubTitle>
            {quantityInStock <= 0 ? (
                <Text
                    text={t('productInfo.quantityOutOfStock')}
                    className={classNames(
                        `${className} mt-2 ml-2 text-base lg:text-xl text-red-600`,
                    )}
                />
            ) : (
                <FlexContainer
                    direction="flex-row"
                    justify="justify-start"
                    className="items-baseline"
                >
                    <Text
                        text={`${quantityInStock}`}
                        className={classNames(
                            `${className} mt-2 ml-1 text-base font-bold lg:text-xl text-green-700`,
                        )}
                    />
                    <Text
                        text={t('productInfo.quantityInStock')}
                        className={classNames(
                            `${className} mt-2 ml-2 text-sm lg:text-base text-gray-600`,
                        )}
                    />
                    <div className="relative w-5 h-5 mt-2 ml-2 md:w-6 md:h-6">
                        <Image
                            src="/icons/tick.svg"
                            layout="responsive"
                            width={22}
                            height={22}
                        />
                    </div>
                </FlexContainer>
            )}
        </div>
    );
}

export default ProductStockQuantity;
