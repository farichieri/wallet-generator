'use client';

import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Blockchain } from '@/features/blockchains';
import { formatHash } from '@/lib/utils';

interface WalletItemProps {
  wallet: string;
  index: number;
  onSelect?: (wallet: string) => void;
  onDelete?: (wallet: string, index: number) => void;
  blockchain: Blockchain;
  isDeleting?: boolean;
}

const WalletItem: React.FC<WalletItemProps> = ({
  wallet,
  index,
  onSelect,
  onDelete,
  blockchain,
  isDeleting,
}) => {
  const BlockchainIcon = Icons[blockchain];
  return (
    <Link
      href={`/dashboard/blockchains/${blockchain}/${wallet}`}
      className="flex h-auto w-full cursor-pointer items-center justify-between rounded-xl border p-4 duration-100 hover:bg-muted active:bg-muted/50"
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
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDelete(wallet, index);
          }}
          disabled={isDeleting}
          isLoading={isDeleting}
        >
          <Icons.trashGeist className="h-4 w-4" />
        </Button>
      )}
    </Link>
  );
};

export default WalletItem;
