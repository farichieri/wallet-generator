'use server';

import { auth } from '@/auth';
import { decryptSeed } from '@/features/auth';
import { UserAccounts } from '@/features/wallets';
import { ErrorResult, SuccessResult, handleReturnError } from '@/lib/utils';

import { getEthereumWallet } from './getEthereumWallet';
import { getSolanaWallet } from './getSolanaWallet';

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

    const realDerivationPaths = {
      ethereum: derivationPaths.filter((path) => path.includes("m/44'/60'/")),
      solana: derivationPaths.filter((path) => path.includes("m/44'/501'/")),
    };

    const ethereumPromises = await Promise.all(
      realDerivationPaths.ethereum.map((path) =>
        getEthereumWallet({ seed: seedStr, derivationPath: path }),
      ),
    );

    const solanaPromises = await Promise.all(
      realDerivationPaths.solana.map((path) =>
        getSolanaWallet({ seed: seedStr, derivationPath: path }),
      ),
    );

    const ethereumWallets = ethereumPromises.filter(
      (wallet) => wallet,
    ) as string[];

    const solanaWallets = solanaPromises.filter((wallet) => wallet) as string[];

    return {
      error: false,
      data: {
        ethereum: ethereumWallets,
        solana: solanaWallets,
      },
    };
  } catch (error) {
    return handleReturnError(error, 'Error getting user wallets');
  }
}
