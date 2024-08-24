'use server';

import { cookies } from 'next/headers';

import { handleError } from '@/lib/utils';

export async function getSession() {
  try {
    const encryptedSeedAndDerivationPaths = cookies().get(
      'encryptedSeedAndDerivationPaths',
    )?.value;
    const salt = cookies().get('salt')?.value;

    return {
      encryptedSeedAndDerivationPaths,
      salt,
    };
  } catch (error) {
    handleError(error, 'Error getting session');
  }
}
