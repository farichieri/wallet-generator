'use server';

import { cookies } from 'next/headers';

import { handleError } from '@/lib/utils';

export async function getSession() {
  try {
    const session = cookies().has('hashedPassword');
    return session;
  } catch (error) {
    handleError(error, 'Error getting session');
  }
}
