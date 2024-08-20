import { redirect } from 'next/navigation';

import { getSession } from '@/features/auth';
import { WalletGenerator } from '@/features/create-wallet';

export const revalidate = 0;

export default async function Home() {
  const session = await getSession();

  if (session?.address) {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-auto w-full flex-1 items-center justify-center">
      <WalletGenerator />
    </div>
  );
}
