import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { getUserData } from '@/features/auth';

export const revalidate = 0;

export default async function Home() {
  const session = await auth();
  const userData = await getUserData();

  if (session) {
    redirect('/dashboard');
  }

  const hasData = userData?.encryptedUserData;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex h-auto w-full flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="mb-2 text-center text-3xl font-bold">
            Welcome to Typen
          </h1>

          {hasData ? (
            <Link className="flex w-full" href="/login">
              <Button className="w-full" variant="default" size="lg">
                Login
              </Button>
            </Link>
          ) : (
            <>
              <Link className="flex w-full" href="/create-wallet">
                <Button className="w-full" size="lg">
                  Create Wallet
                </Button>
              </Link>
              <Link className="flex w-full" href="/import-wallet">
                <Button className="w-full" variant="outline" size="lg">
                  Import Wallet
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
