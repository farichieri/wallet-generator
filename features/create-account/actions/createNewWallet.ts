'use server';

import { auth } from '@/auth';
import { decryptSeed, updateSession } from '@/features/auth';
import { Blockchain } from '@/features/blockchains';
import {
  getNewEthereumDerivationPath,
  getNewSolanaDerivationPath,
} from '@/features/import-account';
import { handleError } from '@/lib/utils';

interface Props {
  blockchain: Blockchain;
}

export async function createNewWallet({ blockchain }: Props) {
  try {
    const session = await auth();
    const { encryptedUserData, salt, password } = session?.user || {};

    if (!encryptedUserData || !salt || !password) {
      throw new Error('No encrypted seed found');
    }

    // *  I decrypt the seed with the hashed password and salt.
    // * * But I am not showing sensitive data because the mnemonic is not shown.
    // * * The mnemonic is only used to generate the seed once.
    const res = await decryptSeed({
      encryptedSeed: encryptedUserData,
      password: password,
      salt,
    });

    const { seedStr, derivationPaths } = res;

    let newDerivationPath = '';
    if (blockchain === 'ethereum') {
      newDerivationPath = getNewEthereumDerivationPath(derivationPaths);
    } else if (blockchain === 'solana') {
      newDerivationPath = getNewSolanaDerivationPath(derivationPaths);
    }

    console.log({ newDerivationPath });

    const newDerivationPaths = [...derivationPaths, newDerivationPath];
    console.log({ newDerivationPaths });

    const updatedRes = await updateSession({
      seed: seedStr,
      password: password,
      derivationPaths: newDerivationPaths,
      salt,
    });

    return updatedRes;
  } catch (error) {
    handleError(error, 'Error creating new wallet');
  }
}
