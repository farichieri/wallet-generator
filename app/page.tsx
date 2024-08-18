import { redirect } from 'next/navigation';

import { getSession } from '@/features/auth';
import { WalletGenerator } from '@/features/create-wallet';

export const revalidate = 0;

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="w-full">
      <WalletGenerator />
    </div>
  );
}
