import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import Nav from '@/components/Nav';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Wallet Generator',
  description: 'Create a new wallet easily',
};

interface Props {
  children: React.ReactNode;
  params: { blockchainId: string };
  searchParams: { wallet: string };
}

export default async function DashboardLayout({
  children,
  params,
  searchParams,
}: Props) {
  const session = await auth();

  console.log({ params, searchParams });

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <Nav blockchainId={params.blockchainId} />
      {children}
    </>
  );
}
