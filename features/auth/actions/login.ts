'use server';

import { cookies } from 'next/headers';

import { delay, handleError } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export async function login(password: string) {
  try {
    // 2 seconds promise
    await delay(2000);

    const encryptedSeedAndDerivationPaths = cookies().get('encryptedSeedAndDerivationPaths');

    return bcrypt.compare(password, encryptedSeedAndDerivationPaths);
  } catch (error) {
    handleError(error, 'Error logging in');
  }
}
