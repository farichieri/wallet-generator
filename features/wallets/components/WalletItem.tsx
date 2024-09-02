'use client';

import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Blockchain } from '@/features/blockchains';
import { formatHash } from '@/lib/utils';

interface WalletItemProps {
  blockchain: Blockchain;
  index: number;
  isDeleting?: boolean;
  isWalletRoute?: boolean;
  onDelete?: (wallet: string, index: number) => void;
  wallet: string;
}

const WalletItem: React.FC<WalletItemProps> = ({
  blockchain,
  index,
  isDeleting,
  onDelete,
  wallet,
}) => {
  const BlockchainIcon = Icons[blockchain];
  return (
    <Link
      className="flex h-auto w-full cursor-pointer items-center justify-between rounded-xl border p-4 duration-100 hover:bg-muted active:bg-muted/50"
      href={`/dashboard/blockchains/${blockchain}/${wallet}`}
      key={wallet}
      title={wallet}
    >
      <BlockchainIcon className="h-8 w-8" />
      <div className="ml-4 mr-auto flex flex-col items-start justify-center">
        <span>Wallet {index + 1}</span>
        <span className="text-muted-foreground">{formatHash(wallet)}</span>
      </div>
      {onDelete && (
        <Button
          className="rounded-md"
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(wallet, index);
          }}
          isLoading={isDeleting}
          variant="link"
        >
          <Icons.trashGeist className="h-4 w-4" />
        </Button>
      )}
    </Link>
  );
};

export default WalletItem;
