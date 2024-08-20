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

export default async function DashboardLayout({ children }: Props) {
  const session = await getSession();

  if (!session?.address || !session?.hashedPassword) {
    redirect('/');
  }

  return <>{children}</>;
}
