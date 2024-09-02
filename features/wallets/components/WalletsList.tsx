'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { Blockchain } from '@/features/blockchains';
import { deleteEthereumWallet } from '@/features/create-account';
import { handleSubmissionError } from '@/lib/utils';

import CreateNewWallet from './CreateNewWallet';
import WalletItem from './WalletItem';
import { UserAccounts } from '../types';

interface Props {
  accounts: UserAccounts;
  blockchain: Blockchain;
  session: Session | null;
}

const WalletsList: React.FC<Props> = ({ accounts, blockchain, session }) => {
  const { update } = useSession();
  const router = useRouter();

  console.log({ accounts, blockchain });

  const wallets = accounts[blockchain];
  const [isDeletingIndex, setIsDeletingIndex] = useState<number | null>(null);

  const handleDelete = async (wallet: string, index: number) => {
    try {
      setIsDeletingIndex(index);
      const res = await deleteEthereumWallet(index);
      await update({
        user: {
          encryptedUserData: res?.encryptedSeed,
        },
      });
    } catch (error) {
      handleSubmissionError(error, `Error deleting wallet ${wallet}`);
    } finally {
      router.refresh();
      setIsDeletingIndex(null);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full max-w-sm flex-col gap-2">
        {wallets.map((wallet, index) => {
          return (
            <WalletItem
              blockchain={blockchain}
              index={index}
              isDeleting={isDeletingIndex === index}
              key={wallet}
              onDelete={handleDelete}
              wallet={wallet}
            />
          );
        })}
      </div>
      <CreateNewWallet blockchain={blockchain} />
    </div>
  );
};

export default WalletsList;
