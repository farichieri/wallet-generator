'use server';

import { cookies } from 'next/headers';

import { handleError } from '@/lib/utils';

export async function getSession() {
  try {
    const hashedPassword = cookies().has('hashedPassword');
    const address = cookies().get('address');

    return {
      hashedPassword,
      address,
    };
  } catch (error) {
    handleError(error, 'Error getting session');
  }
}
