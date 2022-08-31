import { INetwork, networks } from '@constants/networks.constants';

export type Network = 'matic' | 'rinkeby';

/**
 * @description Function to build the explorer link for a given network transaction hash
 * @param network - The network Infos as INetwork interface
 * @param txHash - The transaction hash
 * @returns The explorer link
 */
export const generateExplorerLink = (
    network: INetwork,
    txHash: string,
): string => {
    const { blockExplorerUrl } = network;
    return `${blockExplorerUrl}/tx/${txHash}`;
};

/**
 * @description Function to find the network infos for a given network name
 * @param networkName - The network name (e.g: rinkeby, matic)
 * @returns INetwork object or undefined if not found
 */
export const getNetworkInfos = (networkName: string): INetwork | undefined =>
    networks.find(
        (network) => network.name.toLowerCase() === networkName.toLowerCase(),
    );
