'use server';

import { cookies } from 'next/headers';

import { handleError } from '@/lib/utils';

import { encryptSeed } from './encryptSeed';

export const updateSession = async ({
  derivationPaths,
  seed,
  password,
  salt,
}: {
  password: string;
  seed: string;
  derivationPaths: string[];
  salt: string;
}) => {
  try {
    // 2 seconds promise
    // await delay(2000);

    console.log({ derivationPaths });

    const encryptedSeedAndPassword = await encryptSeed({
      seed,
      password,
      derivationPaths,
      salt,
    });

    cookies().set('encryptedUserData', encryptedSeedAndPassword.encryptedSeed);
    cookies().set('salt', encryptedSeedAndPassword.salt);

    return encryptedSeedAndPassword;
  } catch (error) {
    handleError(error, 'Error Signing Up');
  }
};
