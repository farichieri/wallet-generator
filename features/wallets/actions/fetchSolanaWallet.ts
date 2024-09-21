'use server';

import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

interface Props {
  walletAddress: string;
}

export async function fetchSolanaWallet({ walletAddress }: Props) {
  try {
    // Create a new connection to the Solana blockchain
    const connection = new Connection(
      clusterApiUrl('mainnet-beta'),
      'confirmed',
    );

    // Convert the wallet address to a PublicKey
    const publicKey = new PublicKey(walletAddress);

    // Fetch balance in lamports
    const balanceInLamports = await connection.getBalance(publicKey);
    console.log({ balanceInLamports });
    // Convert balance to SOL (1 SOL = 1,000,000,000 lamports)
    const balanceInSol = balanceInLamports / 1_000_000_000;
    console.log({ balanceInSol });

    return balanceInSol.toString();
  } catch (error) {
    console.error('Error fetching Solana wallet balance:', error);
    return null;
  }
}
