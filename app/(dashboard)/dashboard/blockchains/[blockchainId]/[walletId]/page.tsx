import Back from '@/components/Back';
import { Blockchain } from '@/features/blockchains';
import { Wallet } from '@/features/wallets';
import WalletItem from '@/features/wallets/components/WalletItem';

export const revalidate = 0;

interface Props {
  params: { walletId: string; blockchainId: Blockchain };
}

export default async function Page({ params }: Props) {
  const { walletId, blockchainId } = params;
  return (
    <section className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 py-24">
      <div className="w-full">
        <Back />
      </div>
      <div className="w-full max-w-sm">
        <WalletItem blockchain={blockchainId} index={0} wallet={walletId} />
      </div>
      <Wallet />
    </section>
  );
}
