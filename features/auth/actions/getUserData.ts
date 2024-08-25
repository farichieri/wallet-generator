'use server';

import { cookies } from 'next/headers';

import { handleError } from '@/lib/utils';

export async function getUserData() {
  try {
    const password = cookies().get('password')?.value;
    const salt = cookies().get('salt')?.value;
    const encryptedUserData = cookies().get('encryptedUserData')?.value;

    return {
      password,
      salt,
      encryptedUserData,
    };
  } catch (error) {
    handleError(error, 'Error getting user');
  }
}
