import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Wallet Generator',
  description: 'Create a new wallet easily',
};

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between px-4 pb-24 pt-[calc(var(--nav-height)+1rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
