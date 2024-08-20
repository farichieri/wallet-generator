'use server';

import { ethers } from 'ethers';

import { handleError } from '@/lib/utils';

export async function createEthersWallet({ mnemonic }: { mnemonic: string }) {
  try {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log({ wallet });
    return wallet.address;
  } catch (error) {
    handleError(error, 'Error creating ethers wallet');
  }
}
