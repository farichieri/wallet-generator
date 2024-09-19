'use server';

import { fetchEthereumBalance } from './fetchEthereumWallet';

interface Props {
  blockchain: string;
  walletAddress: string;
}

export const getBalance = async ({ blockchain, walletAddress }: Props) => {
  switch (blockchain) {
    case 'ethereum':
      return await fetchEthereumBalance({ walletAddress });
    default:
      return null;
  }
};
