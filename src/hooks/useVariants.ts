import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export interface ISelectedOption {
    optionName: string;
    optionValue: string;
}

export type OnChangeOptionHandler = (newOption: ISelectedOption) => void;

const getCurrentVariant = (
    productVariants: IMetaShopVariant[],
    selectedOptions: ISelectedOption[],
) =>
    productVariants.find((v) =>
        v.attributes.every(
            ({ option: variantOptionValue, name: variantOptionName }) =>
                selectedOptions.some(
                    ({
                        optionValue: selectedOptionValue,
                        optionName: selectedOptionName,
                    }) =>
                        selectedOptionValue.toLowerCase() ===
                            variantOptionValue.toLowerCase() &&
                        selectedOptionName.toLowerCase() ===
                            variantOptionName.toLowerCase(),
                ),
        ),
    ) || null;

const useVariations = (
    productVariants: IMetaShopVariant[],
    totalOptionsAvaibles: number,
) => {
    const [currentVariant, setCurrentVariant] =
        useState<IMetaShopVariant | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<ISelectedOption[]>(
        [],
    );
    const { t } = useTranslation();
    const onChangeVariant: OnChangeOptionHandler = ({
        optionName,
        optionValue,
    }: ISelectedOption) => {
        if (
            totalOptionsAvaibles !== selectedOptions.length ||
            !productVariants.length ||
            !totalOptionsAvaibles
        ) {
            // eslint-disable-next-line no-useless-return
            return;
        }

        const existingIndex = selectedOptions.findIndex(
            (s) => s.optionName.toLowerCase() === optionName.toLowerCase(),
        );
        const copyOfSelectedOptions = [...selectedOptions];

        if (existingIndex === -1) {
            copyOfSelectedOptions.push({ optionName, optionValue });
        } else {
            copyOfSelectedOptions.splice(existingIndex, 1, {
                optionName,
                optionValue,
            });
        }

        if (!getCurrentVariant(productVariants, copyOfSelectedOptions)) {
            toast.error(`${t('productOverview.productUnavalaible')} 🫢`);
            return;
        }
        setSelectedOptions(copyOfSelectedOptions);
    };

    useEffect(() => {
        if (!productVariants.length) {
            return;
        }
        setSelectedOptions(
            productVariants[0].attributes.map(({ name, option }) => ({
                optionName: name,
                optionValue: option,
            })),
        );
        setCurrentVariant(getCurrentVariant(productVariants, selectedOptions));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const newVariant = getCurrentVariant(productVariants, selectedOptions);
        if (newVariant) {
            setCurrentVariant(newVariant);
        }
    }, [selectedOptions, productVariants]);

    return { currentVariant, onChangeVariant, selectedOptions };
};

export default useVariations;
