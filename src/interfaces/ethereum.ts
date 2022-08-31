import { providers } from 'ethers';

export interface IWindowEthereum extends providers.ExternalProvider {
    //  ...someOtherProperties;
    selectedAddress: string;
    chainId: string;
    isMetamask: boolean;
    networkVersion: string;
}
