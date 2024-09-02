'use server';

import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';

import { handleError } from '@/lib/utils';

interface Props {
  seed: string;
  derivationPath: string;
}

export async function getSolanaWallet({ seed, derivationPath }: Props) {
  try {
    if (!seed || !derivationPath) {
      throw new Error('Missing required fields');
    }

    const derivedSeed = derivePath(derivationPath, seed).key;
    const keypair = Keypair.fromSeed(derivedSeed);

    return keypair.publicKey.toString();
  } catch (error) {
    handleError(error, 'Error getting Solana wallet');
  }
}
