'use server';

import { signOut } from '@/auth';
import { handleError } from '@/lib/utils';

export async function unAuthenticate() {
  try {
    return await signOut();
  } catch (error) {
    if (error instanceof Error) {
      if (error?.message === 'NEXT_REDIRECT') {
        return;
      }
    }
    handleError(error, 'Error signing out');
  }
}
