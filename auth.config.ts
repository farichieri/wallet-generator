import type { NextAuthConfig } from 'next-auth';

export default {
  secret: process.env.NEXAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl }, ...data3 }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      if (isLoggedIn) {
        if (isOnLoginPage) {
          return Response.redirect(new URL('/', nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        token = {
          ...token,
          id: user.id,
          salt: user.salt,
          password: user.password,
          encryptedUserData: user.encryptedUserData,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        const { id, salt, password, encryptedUserData } = token as {
          id: string;
          salt: string;
          password: string;
          encryptedUserData: string;
        };
        const { user } = session;

        session = {
          ...session,
          user: { ...user, id, salt, password, encryptedUserData },
        };
      }

      // console.log({ session });
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
