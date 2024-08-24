'use server';

import { HDNodeWallet, Wallet } from 'ethers';

import { handleError } from '@/lib/utils';

interface Props {
  seed: string;
  derivationPath: string;
}

export async function getEthereumWallet({ seed, derivationPath }: Props) {
  try {
    if (!seed || !derivationPath) {
      throw new Error('Missing required fields');
    }

    const bufferSeed = Buffer.from(seed, 'hex');

    const hdNode = HDNodeWallet.fromSeed(bufferSeed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    console.log({ address: wallet.address });

    return wallet.address;
  } catch (error) {
    handleError(error, 'Error getting Ethereum wallet');
  }
}
