import { auth } from '@/auth';
import { getUserWallets } from '@/features/blockchains/actions';
import { WalletsList } from '@/features/wallets';

export const revalidate = 0;

export default async function Home() {
  const wallets = await getUserWallets();
  const session = await auth();

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-24">
      {wallets.error ? (
        <div>Error fetching wallets: {wallets.error}</div>
      ) : wallets.data ? (
        <div className="flex flex-col items-center gap-2">
          <p>Wallets:</p>
          <WalletsList
            accounts={wallets.data}
            blockchain="ethereum"
            session={session}
          />
        </div>
      ) : (
        <div>No wallets found</div>
      )}
    </section>
  );
}
