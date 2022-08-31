/* eslint-disable react-hooks/exhaustive-deps */
import { axiosInstance } from '@fetcher/next-api.fetcher';
import useAppState from '@hooks/useAppState';
import useLocalStorage from '@hooks/useLocalStorage';
import useInvoicesState from '@src/hooks/useInvoicesState';
import { ReactNode, useEffect } from 'react';
import { useQuery } from 'react-query';
import Body from './Body';

interface ILayoutProps {
    children: ReactNode;
    siteInfos: ISiteInfos;
}

function Layout({ children, siteInfos }: ILayoutProps): JSX.Element {
    const { dispatchIsAuth, dispatchSetSiteInfos } = useAppState();
    const {
        value: [firstValue],
        setValue,
    } = useLocalStorage<{ token: string }>('spend-coin-token');
    const { dispatchSetInvoiceIds } = useInvoicesState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatchSetInvoiceIds(
                JSON.parse(window.localStorage.getItem('invoiceId') as string),
            );
        }
        const { siteIconUrl, siteUrl, ...rest } = siteInfos;
        dispatchSetSiteInfos(rest);
    }, [siteInfos]);

    useQuery(
        'checkToken',
        () =>
            axiosInstance
                .post('/api/auth/me', firstValue?.token || '', {
                    headers: {
                        Authorization: `Bearer ${firstValue?.token || ''}`,
                    },
                })
                .then((r) => r.data),
        {
            onSuccess: (data) => {
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
                setValue([{ token: data.token }]);
                dispatchIsAuth(true);
            },
            onError: () => {
                dispatchIsAuth(false);
            },
            refetchInterval: () => {
                const jwtSessionTime =
                    process.env.NEXT_PUBLIC_JWT_EXPIRATION_TIME;
                return jwtSessionTime
                    ? +jwtSessionTime - 10000
                    : 1000 * 60 * 25;
            },
        },
    );

    return (
        <div className="w-full min-h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <Body>{children}</Body>
        </div>
    );
}

export default Layout;
