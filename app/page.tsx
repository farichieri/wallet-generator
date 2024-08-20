import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/auth';

export const revalidate = 0;

export default async function Home() {
  const session = await getSession();

  if (session?.address) {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-auto w-full flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome to Typen
        </h1>
        <Link className="flex" href="/create-wallet">
          <Button size="lg">Create Wallet</Button>
        </Link>
      </div>
    </div>
  );
}
