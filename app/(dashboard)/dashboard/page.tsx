import { auth } from '@/auth';
import { AccountSelector } from '@/features/accounts';
import { getUserWallets } from '@/features/blockchains/actions';

export const revalidate = 0;

export default async function Home() {
  const wallets = await getUserWallets();
  const session = await auth();

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-24">
      {wallets.error ? (
        <div>Error fetching wallets: {wallets.error}</div>
      ) : wallets.data ? (
        <AccountSelector
          accounts={wallets.data}
          blockchain="ethereum"
          session={session}
        />
      ) : (
        <div>No wallets found</div>
      )}
    </section>
  );
}
