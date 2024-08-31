'use server';

import { auth } from '@/auth';
import { decryptSeed } from '@/features/auth';
import { UserAccounts } from '@/features/wallets';
import { ErrorResult, SuccessResult, handleReturnError } from '@/lib/utils';

import { getEthereumWallet } from './getEthereumWallet';

export async function getUserWallets(): Promise<
  SuccessResult<UserAccounts> | ErrorResult
> {
  try {
    const session = await auth();
    const { encryptedUserData, salt, password } = session?.user || {};

    if (!encryptedUserData || !salt || !password) {
      throw new Error('No encrypted seed found');
    }

    const res = await decryptSeed({
      encryptedSeed: encryptedUserData,
      password: password,
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
      error: false,
      data: {
        ethereum: ethereumWallets,
        solana: [],
      },
    };
  } catch (error) {
    return handleReturnError(error, 'Error getting user wallets');
  }
}
