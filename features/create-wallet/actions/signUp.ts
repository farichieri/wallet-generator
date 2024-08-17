'use server';

import { delay, handleError } from '@/lib/utils';

const bcrypt = require('bcrypt');

export const signUp = async (password: string) => {
  try {
    // 2 seconds promise
    await delay(2000);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    handleError(error, 'Error creating password');
  }
};
