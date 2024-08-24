'use server';

import { cookies } from 'next/headers';

import { delay, handleError } from '@/lib/utils';

import { encryptSeed } from './encryptSeed';

export const updateSession = async ({
  derivationPaths,
  seed,
  password,
}: {
  password: string;
  seed: string;
  derivationPaths: string[];
}) => {
  try {
    // 2 seconds promise
    await delay(2000);

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
