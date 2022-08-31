import {
    addInvoiceId,
    removeInvoiceId,
    setHistoryItemCurrencyDecimals,
    setHistoryItems,
} from '@redux/actions';
import { RootState } from '@redux/reducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useInvoicesState = () => {
    const dispatch = useDispatch();
    const { historyItems } = useSelector((state: RootState) => state.invoices);

    useEffect(() => {
        const itemsInLocalStorage = historyItems.map(
            ({ invoiceId, orderId }) => ({
                invoiceId,
                orderId,
            }),
        );
        localStorage.setItem('invoiceId', JSON.stringify(itemsInLocalStorage));
    }, [historyItems]);

    const dispatchSetInvoiceIds = (
        invoiceIds: ILocalStorageInvoiceIdSession[],
    ) => dispatch(setHistoryItems(invoiceIds));

    const dispatchAddInvoiceId = (invoiceId: ILocalStorageInvoiceIdSession) =>
        dispatch(addInvoiceId(invoiceId));

    const dispatchRemoveInvoiceId = (invoiceId: string) =>
        dispatch(removeInvoiceId(invoiceId));

    const triggerDispatchSetHistoryItemDecimals = (historyItem: {
        invoiceId: string;
        decimals: number;
    }) => {
        dispatch(setHistoryItemCurrencyDecimals(historyItem));
    };

    return {
        historyItems,
        dispatchSetInvoiceIds,
        dispatchRemoveInvoiceId,
        dispatchAddInvoiceId,
        triggerDispatchSetHistoryItemDecimals,
    };
};
export default useInvoicesState;
