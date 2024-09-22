import Back from '@/components/Back';
import { HashString } from '@/components/Hash';
import { Icons } from '@/components/Icons';
import { Blockchain } from '@/features/blockchains';
import { Wallet, getBalance } from '@/features/wallets';

export const revalidate = 0;

interface Props {
  params: { walletId: string; blockchainId: Blockchain };
}

export default async function Page({ params }: Props) {
  const { walletId, blockchainId } = params;

  const BlockchainIcon = Icons[blockchainId];

  const balance = await getBalance({
    blockchain: blockchainId,
    walletAddress: walletId,
  });

  return (
    <section className="flex w-full max-w-4xl flex-col items-center justify-center gap-4">
      <div className="w-full">
        <Back />
      </div>
      <div className="mx-auto flex w-fit">
        <BlockchainIcon className="h-10 w-10 rounded-xl border p-2" />
        <div className="ml-4 mr-auto flex flex-col items-start justify-center">
          <HashString hash={walletId} withCopy />
        </div>
      </div>
      <Wallet walletId={walletId} balance={balance} />
    </section>
  );
}
