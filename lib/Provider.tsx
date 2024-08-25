'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

const Provider: React.FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider refetchInterval={60} session={session}>
      <Toaster />
      {children}
    </SessionProvider>
  );
};

export default Provider;
