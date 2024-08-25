import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import authConfig from './auth.config';
import { getUserData } from './features/auth';
import { hashAndSaltPassword } from './features/auth/actions/hashAndSaltPassword';

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { password } = parsedCredentials.data;
          const user = await getUserData();

          console.log({ user });

          if (!user || !user.encryptedUserData || !user.salt) return null;

          const hashedPassword = await hashAndSaltPassword({
            password,
            salt: user.salt,
          });

          console.log({ hashedPassword, userPassword: user.password });
          if (hashedPassword === user.password) {
            // Return user object to be stored in session * Without encryptedUserData decryption.
            return {
              password: user.password,
              salt: user.salt,
              encryptedUserData: user.encryptedUserData,
            };
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
});
