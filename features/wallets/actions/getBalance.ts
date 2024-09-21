'use server';

import { fetchEthereumBalance } from './fetchEthereumWallet';
import { fetchSolanaWallet } from './fetchSolanaWallet';

interface Props {
  blockchain: string;
  walletAddress: string;
}

export const getBalance = async ({ blockchain, walletAddress }: Props) => {
  switch (blockchain) {
    case 'ethereum':
      return await fetchEthereumBalance({ walletAddress });
    case 'solana':
      return await fetchSolanaWallet({ walletAddress });
    default:
      return null;
  }
};
