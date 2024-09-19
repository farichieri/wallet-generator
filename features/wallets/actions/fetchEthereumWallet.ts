'use server';

import Web3 from 'web3';

import { ethereumBlockchainConfig } from '@/features/blockchains';

const web3 = new Web3(ethereumBlockchainConfig.RpcConnectionUrls.MAINNET.url);

interface Props {
  walletAddress: string;
}

export async function fetchEthereumBalance({
  walletAddress,
}: {
  walletAddress: string;
}) {
  try {
    // Fetch balance in Wei
    const balanceInWei = await web3.eth.getBalance(walletAddress);
    // Convert balance to Ether
    let balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

    if (balanceInEther === '0.') {
      balanceInEther = '0';
    }

    return balanceInEther;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return null;
  }
}
