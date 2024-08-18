'use server';

import { cookies } from 'next/headers';

import { delay, handleError } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

export const signUp = async (password: string) => {
  try {
    // 2 seconds promise
    await delay(2000);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    cookies().set('hashedPassword', hashedPassword);
  } catch (error) {
    handleError(error, 'Error Signing Up');
  }
};
