import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getSession } from '@/features/auth';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Wallet Generator',
  description: 'Create a new wallet easily',
};

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await getSession();

  console.log({ session });

  if (session?.encryptedSeedAndDerivationPaths) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
