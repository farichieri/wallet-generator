'use server';

import crypto from 'crypto';

import { mnemonicToSeedSync } from 'bip39';
import { cookies } from 'next/headers';

import { delay, handleError } from '@/lib/utils';

import { encryptSeed } from './encryptSeed';
import { hashAndSaltPassword } from './hashAndSaltPassword';

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

    const salt = crypto.randomBytes(16).toString('hex');

    const hashedPassword = await hashAndSaltPassword({ password, salt });

    const encryptedSeedAndPassword = await encryptSeed({
      derivationPaths,
      password: hashedPassword,
      salt,
      seed,
    });

    cookies().set('encryptedUserData', encryptedSeedAndPassword.encryptedSeed);
    cookies().set('password', hashedPassword);
    cookies().set('salt', encryptedSeedAndPassword.salt);
  } catch (error) {
    handleError(error, 'Error Signing Up');
  }
};
