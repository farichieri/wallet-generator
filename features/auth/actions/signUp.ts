'use server';

import { mnemonicToSeedSync } from 'bip39';
import { cookies } from 'next/headers';

import { delay, handleError } from '@/lib/utils';

import { encryptSeed } from './encryptSeed';

export const signUp = async ({
  password,
  mnemonic,
  derivationPaths,
}: {
  password: string;
  mnemonic: string;
  derivationPaths: string[];
}) => {
  try {
    // 2 seconds promise
    await delay(2000);

    const seed = mnemonicToSeedSync(mnemonic).toString('hex');

    const encryptedSeedAndPassword = await encryptSeed({
      seed,
      password,
      derivationPaths,
    });

    cookies().set(
      'encryptedSeedAndDerivationPaths',
      encryptedSeedAndPassword.encryptedSeed,
    );
    cookies().set('salt', encryptedSeedAndPassword.salt);
  } catch (error) {
    handleError(error, 'Error Signing Up');
  }
};
