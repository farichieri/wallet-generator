import { auth } from '@/auth';
import { Blockchain, getUserWallets } from '@/features/blockchains';
import { WalletsList } from '@/features/wallets';

export const revalidate = 0;

interface Props {
  params: { blockchainId: Blockchain };
}

export default async function Page({ params }: Props) {
  const wallets = await getUserWallets();
  const session = await auth();

  const { blockchainId } = params;

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 pt-10">
      {wallets.error ? (
        <div>Error fetching wallets: {wallets.error}</div>
      ) : wallets.data ? (
        <div className="flex w-full flex-col items-center gap-2">
          <h1 className="heading text-2xl">Wallets:</h1>
          <WalletsList
            accounts={wallets.data}
            blockchain={blockchainId}
            session={session}
          />
        </div>
      ) : (
        <div>No wallets found</div>
      )}
    </section>
  );
}
