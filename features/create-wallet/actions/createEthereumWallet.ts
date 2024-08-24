'use server';

import { mnemonicToSeedSync } from 'bip39';
import { HDNodeWallet, Wallet } from 'ethers';

import { handleError } from '@/lib/utils';

export async function createEthereumWallet({
  mnemonic,
  index,
}: {
  mnemonic: string;
  index: number;
}) {
  try {
    const seed = mnemonicToSeedSync(mnemonic);
    const derivationPath = `m/44'/60'/${index}'/0/0`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    console.log({ wallet });
    return wallet;
  } catch (error) {
    handleError(error, 'Error creating ethers wallet');
  }
}
