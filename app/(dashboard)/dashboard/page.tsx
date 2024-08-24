import { AccountSelector } from '@/features/accounts';
import { getUserWallets } from '@/features/blockchains/actions';

export const revalidate = 0;

export default async function Home() {
  const wallets = await getUserWallets();

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-24">
      {wallets ? (
        <AccountSelector accounts={wallets} blockchain="ethereum" />
      ) : (
        <div>No wallets found</div>
      )}
    </section>
  );
}
