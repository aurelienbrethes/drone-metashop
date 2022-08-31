import quickSwapList from 'quickswap-default-token-list';
import * as cryptoIcons from './cryptoIcons.constants';

const devList: IToken[] = [
    {
        symbol: 'sUSD',
        name: 'Synthetic sUSD',
        address: '0x21718C0FbD10900565fa57C76e1862cd3F6a4d8E',
        decimals: 18,
        logoURI: cryptoIcons.usdcIcon.src,
        chainId: 3,
    },
    {
        symbol: 'WETH',
        name: 'Wrapped Ethereum',
        address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
        decimals: 18,
        logoURI: cryptoIcons.ethIcon.src,
        chainId: 3,
    },
    {
        symbol: 'sBTC',
        name: 'Syntehic sBTC',
        address: '0xC1701AbD559FC263829CA3917d03045F95b5224A',
        decimals: 18,
        logoURI: cryptoIcons.btcIcon.src,
        chainId: 3,
    },
    {
        symbol: 'KNC',
        name: 'Kyber Network Crystal',
        address: '0x7b2810576aa1cce68f2b118cef1f36467c648f92',
        decimals: 18,
        logoURI: cryptoIcons.kncIcon.src,
        chainId: 3,
    },
    {
        symbol: 'OMG',
        name: 'OmiseGO',
        address: '0x4BFBa4a8F28755Cb2061c413459EE562c6B9c51b',
        decimals: 18,
        logoURI: cryptoIcons.omgIcon.src,
        chainId: 3,
    },
    {
        symbol: 'ELF',
        name: 'AELF',
        address: '0x9Fcc27c7320703c43368cf1A4bf076402cd0D6B4',
        decimals: 18,
        logoURI: cryptoIcons.elfIcon.src,
        chainId: 3,
    },
    {
        symbol: 'BAT',
        name: 'Basic Attention Token',
        address: '0xDb0040451F373949A4Be60dcd7b6B8D6E42658B6',
        decimals: 18,
        logoURI: cryptoIcons.batIcon.src,
        chainId: 3,
    },
    {
        symbol: 'LINK',
        name: 'Chain Link',
        address: '0xb4f7332ed719Eb4839f091EDDB2A3bA309739521',
        decimals: 18,
        logoURI: cryptoIcons.linkIcon.src,
        chainId: 3,
    },
    {
        symbol: 'SNX',
        name: 'Synthetix Network Token',
        address: '0x013ae307648f529aa72c5767a334ddd37aab43c3',
        decimals: 18,
        logoURI: cryptoIcons.snxIcon.src,
        chainId: 3,
    },
    {
        symbol: 'cDAI',
        name: 'Compound Dai',
        address: '0x2b536482a01e620ee111747f8334b395a42a555e',
        decimals: 8,
        logoURI: cryptoIcons.daiIcon.src,
        chainId: 3,
    },
    {
        symbol: 'cBAT',
        name: 'Compound Basic Attention Token',
        address: '0x189ca88be39c9c1b8c8dd437f5ff1db1f584b14b',
        decimals: 8,
        logoURI: cryptoIcons.batIcon.src,
        chainId: 3,
    },
];

// const maticToken: IToken = {
//     symbol: 'MATIC',
//     name: 'Matic',
//     address: '0x0000000000000000000000000000000000001010',
//     decimals: 18,
//     logoURI: cryptoIcons.maticIcon.src,
//     chainId: 137,
// };

const jEuroToken: IToken = {
    symbol: 'jEUR',
    name: 'Jarvis Synthetic Euro',
    address: '0x4e3Decbb3645551B8A19f0eA1678079FCB33fB4c',
    decimals: 18,
    logoURI: cryptoIcons.jeurIcon.src,
    chainId: 137,
};

const usdcToken: IToken = {
    symbol: 'USDC',
    name: 'USDC Coin',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    decimals: 6,
    logoURI: cryptoIcons.usdcIcon.src,
    chainId: 137,
};

const maticListAccepted: IToken[] = [jEuroToken, usdcToken];

export enum TokenListNetworks {
    RINKEBY = 'rinkeby',
    ROPSTEN = 'ropsten',
    MATIC = 'matic',
}

const maticListExcludedTokens = [
    'GHST',
    'OMEN',
    'ETH2x-FLI-P',
    'XGEM',
    'ORION',
];

const tokensList = {
    [TokenListNetworks.ROPSTEN]: {
        accepted: devList,
        all: devList,
    },
    [TokenListNetworks.RINKEBY]: {
        accepted: devList,
        all: devList,
    },
    [TokenListNetworks.MATIC]: {
        accepted: maticListAccepted,
        all: [...quickSwapList.tokens, jEuroToken] // We can add more tokens here with spread operator
            .filter((token) => token.chainId === 137)
            .filter((token) => !maticListExcludedTokens.includes(token.symbol))
            .sort(
                (
                    a,
                    b,
                    aName = a.name.toLowerCase(),
                    bName = b.name.toLowerCase(),
                ) => {
                    if (aName < bName) {
                        return -1;
                    }
                    if (aName > bName) {
                        return 1;
                    }
                    return 0;
                },
            ),
    },
};

export const tokenListChainId = {
    [TokenListNetworks.ROPSTEN]: 3,
    [TokenListNetworks.RINKEBY]: 3,
    [TokenListNetworks.MATIC]: 137,
};

export default tokensList;
