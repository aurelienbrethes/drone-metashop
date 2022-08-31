import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
    inputId: string;
    setListFilter: Dispatch<SetStateAction<string>>;
    placeholder?: string;
}

function SearchBar({
    inputId,
    setListFilter,
    placeholder,
}: IProps): JSX.Element {
    const { t } = useTranslation();
    return (
        <label
            htmlFor="searchbar"
            className="block mx-2 text-sm font-medium text-gray-700"
        >
            <input
                type="text"
                id={inputId}
                placeholder={
                    placeholder || `${t('searchBar.searchPlaceholder')}...`
                }
                onChange={(e) => setListFilter(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-isabelline"
            />
        </label>
    );
}

export default SearchBar;
