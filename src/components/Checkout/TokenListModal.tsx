/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import SearchBar from '@components/UI/SearchBar';
import { filterTokensList } from '@utils/paraswap.utils';
import { useTranslation } from 'react-i18next';

function TokenListModal({
    tokensList,
    isModal,
    setIsModal,
    setTokenSelected,
}: {
    tokensList: IToken[];
    isModal: boolean;
    setIsModal: Dispatch<SetStateAction<boolean>>;
    setTokenSelected: (payload: IToken) => { payload: IToken; type: string };
}): JSX.Element {
    const [listFilter, setListFilter] = React.useState('');
    const { t } = useTranslation();
    return (
        <Dialog
            open={isModal}
            onClose={() => setIsModal(false)}
            className="fixed top-0 bg-black bg-opacity-30"
        >
            <Dialog.Overlay className="flex items-center justify-center w-screen h-screen p-2 cursor-pointer">
                <div className="w-full py-5 bg-white rounded-md sm:w-3/12">
                    <div className="flex items-center justify-between pb-2 mx-4 border-b">
                        <h3 className="font-bold text-gray-900">
                            {t('checkout.selectCurrency')}
                        </h3>
                        <button type="button" onClick={() => setIsModal(false)}>
                            <Image
                                src="/images/close.png"
                                height={15}
                                width={15}
                            />
                        </button>
                    </div>
                    <SearchBar
                        setListFilter={setListFilter}
                        inputId="token-filter"
                        placeholder={t('search.searchToken')}
                    />
                    <div className="flex flex-col items-start px-5 mt-3 overflow-y-scroll h-72">
                        {filterTokensList(tokensList, listFilter).map(
                            (item) => (
                                <button
                                    onClick={() => {
                                        setTokenSelected(item);
                                        setIsModal(false);
                                    }}
                                    className="flex items-center w-full pt-3 pb-2 duration-200 transform border-b hover:bg-gray-100"
                                    type="button"
                                    key={item.address}
                                >
                                    {/* NB: Can not use Image component du to unsupported domains */}
                                    <img
                                        src={item.logoURI}
                                        height={20}
                                        width={20}
                                        alt={item.name}
                                    />
                                    <p className="ml-2 text-gray-900">{`${item.name} (${item.symbol})`}</p>
                                </button>
                            ),
                        )}
                    </div>
                </div>
            </Dialog.Overlay>
        </Dialog>
    );
}

export default TokenListModal;
