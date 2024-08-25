'use server';

import { getStringFromBuffer } from '@/lib/utils';

interface Props {
  password: string;
  salt: string;
}

// SHA-256
export async function hashAndSaltPassword({ password, salt }: Props) {
  const encoder = new TextEncoder();
  const saltedPassword = encoder.encode(password + salt);
  const hashedPasswordBuffer = await crypto.subtle.digest(
    'SHA-256',
    saltedPassword,
  );

  const hashedPassword = getStringFromBuffer(hashedPasswordBuffer);
  return hashedPassword;
}
