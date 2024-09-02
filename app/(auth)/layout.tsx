import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import Footer from '@/components/Footer';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Wallet Generator',
  description: 'Create a new wallet easily',
};

interface Props {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const session = await auth();

  console.log({ session });

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {children}
      </main>
      <Footer />
    </>
  );
}
