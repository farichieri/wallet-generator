'use server';

import { AuthError } from 'next-auth';
import { z } from 'zod';

import { signIn } from '@/auth';
import { ResultCode, ResultCodes } from '@/lib/utils';

interface Result {
  type: string;
  resultCode: ResultCode;
}

export async function authenticate(
  formData: FormData,
): Promise<Result | undefined> {
  try {
    const password = formData.get('password');

    const parsedCredentials = z
      .object({
        password: z.string().min(6),
      })
      .safeParse({
        password,
      });

    if (parsedCredentials.success) {
      await signIn('credentials', {
        password,
        redirect: false,
      });

      return {
        type: 'success',
        resultCode: ResultCodes.UserLoggedIn,
      };
    } else {
      return {
        type: 'error',
        resultCode: ResultCodes.InvalidCredentials,
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCodes.InvalidCredentials,
          };
        default:
          return {
            type: 'error',
            resultCode: ResultCodes.UnknownError,
          };
      }
    }
  }
}
