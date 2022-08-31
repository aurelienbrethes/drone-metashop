interface ILocalStorageInvoiceIdSession {
    invoiceId: string;
    orderId: number;
}

interface IProductOptions {
    name: string;
    bgColor?: string;
    src?: string;
    alt?: string;
}

interface ISiteInfos {
    siteName: string;
    siteDescription: string;
    siteLogoUrl: string;
    siteIconUrl: string;
    shopNotice: string;
    siteUrl: string;
}

interface IMetaShopInfos {
    shop_name: strong;
    shop_description: string;
    shop_logo: string;
    shop_icon: string;
    shop_notice: string;
    shop_url: string;
}

interface IToken {
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: string;
    chainId: number;
}
