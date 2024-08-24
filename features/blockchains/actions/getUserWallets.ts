'use server';

import { UserAccounts } from '@/features/accounts';
import { decryptSeed, getSession } from '@/features/auth';
import { handleError } from '@/lib/utils';

import { getEthereumWallet } from './getEthereumWallet';

export async function getUserWallets(): Promise<UserAccounts | undefined> {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error('No session found');
    }
    const { encryptedSeedAndDerivationPaths, salt } = session || {};

    if (!encryptedSeedAndDerivationPaths || !salt) {
      throw new Error('No encrypted seed found');
    }

    const res = await decryptSeed({
      encryptedSeed: encryptedSeedAndDerivationPaths,
      password: 'test1234', // TODO: get password from user
      salt,
    });

    const { seedStr, derivationPaths } = res;

    const ethereumPromises = await Promise.all(
      derivationPaths.map((path) =>
        getEthereumWallet({ seed: seedStr, derivationPath: path }),
      ),
    );

    const ethereumWallets = ethereumPromises.filter(
      (wallet) => wallet,
    ) as string[];

    return {
      ethereum: ethereumWallets,
      solana: [],
    };
  } catch (error) {
    handleError(error, 'Error getting user wallets');
  }
}
