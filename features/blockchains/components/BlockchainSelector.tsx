'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Icons } from '@/components/Icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Blockchain, BlockchainsWithLogos } from '../types';

interface Props {}

const BlockChainSelector: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { blockchainId } = useParams();
  const router = useRouter();

  const blockchains = Object.values(BlockchainsWithLogos);

  const handleSelectChange = (value: Blockchain) => {
    router.push(`/dashboard/blockchains/${value.toLocaleLowerCase()}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (!blockchainId) {
    return null;
  }

  return (
    <div className="">
      <Select
        defaultValue={blockchainId as string}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="min-w-28">
          <SelectValue placeholder="Blockchain" />
          {isLoading && <Icons.loaderCircle2 className="animate-spin" />}
        </SelectTrigger>
        <SelectContent>
          {blockchains.map((blockchain, index) => {
            const Icon = Icons[blockchain.logo];
            return (
              <SelectItem
                key={index}
                className="w-full"
                value={blockchain.name.toLocaleLowerCase()}
              >
                <div className="flex w-full flex-row items-center">
                  <Icon className="mr-2 h-5 w-5" />
                  <span className="mr-2 capitalize">{blockchain.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlockChainSelector;

/*
4. Be able to see the balance of the account/wallet
5. Be able to see the transactions of the account/wallet
6. Be able to send transactions from the account/wallet
7. Be able to receive transactions to the account/wallet (thats obvious, more UI than functionality)

8. Be able to create new accounts.

9. Be able to see the info of the blockchain/network
10. Be able to swap (advanced)
*/
