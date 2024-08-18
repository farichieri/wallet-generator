'use server';

import { cookies } from 'next/headers';

import { handleError } from '@/lib/utils';

export async function signOut() {
  try {
    cookies().delete('hashedPassword');
  } catch (error) {
    handleError(error, 'Error signing out');
  }
}
