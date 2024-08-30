'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Blockchain } from '@/features/blockchains';
import { CreateEthereumWallet } from '@/features/create-wallet';
import { formatHash } from '@/lib/utils';

import { UserAccounts } from '../types';

interface Props {
  accounts: UserAccounts;
  blockchain: Blockchain;
  session: Session | null;
  walletSelected?: string;
}

const WalletsList: React.FC<Props> = ({
  accounts,
  blockchain,
  session,
  walletSelected,
}) => {
  const wallets = accounts[blockchain];

  const router = useRouter();

  const handleSelectWallet = (wallet: string) => {
    router.push(`/dashboard/blockchains/${blockchain}/${wallet}`);
  };

  const handleDelete = (wallet: string) => {
    console.log(wallet);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-2">
        {wallets.map((wallet) => {
          const BlockchainIcon = Icons[blockchain];
          return (
            <Button
              className="w-full cursor-pointer justify-between rounded-md border p-2"
              key={wallet}
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                handleSelectWallet(wallet);
              }}
              title={wallet}
            >
              <BlockchainIcon className="h-4 w-4" />
              {formatHash(wallet)}
              <Icons.trashGeist
                className="ml-2 h-4 w-4"
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleDelete(wallet);
                }}
              />
            </Button>
          );
        })}
      </div>
      {blockchain === 'ethereum' ? (
        <CreateEthereumWallet session={session} />
      ) : (
        <div>Create Solana Wallet...</div>
      )}
    </div>
  );
};

export default WalletsList;
