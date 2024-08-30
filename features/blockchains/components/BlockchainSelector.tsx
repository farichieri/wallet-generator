'use client';

import { useRouter } from 'next/navigation';

import { Icons } from '@/components/Icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Blockchain, BlockchainsWithLogos } from '../types';

interface Props {
  blockchainId?: string;
}

const BlockChainSelector: React.FC<Props> = ({ blockchainId }) => {
  console.log({ blockchainId });
  const router = useRouter();
  const blockchains = Object.values(BlockchainsWithLogos);

  const handleSelectChange = (value: Blockchain) => {
    console.log(value);
    router.push(`/dashboard/blockchains/${value.toLocaleLowerCase()}`);
  };

  return (
    <div className="">
      <Select defaultValue={blockchainId} onValueChange={handleSelectChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Blockchain" />
        </SelectTrigger>
        <SelectContent>
          {blockchains.map((blockchain, index) => {
            const Icon = Icons[blockchain.logo];
            return (
              <SelectItem key={index} value={blockchain.name}>
                <div className="flex w-full flex-row items-center gap-2">
                  <Icon className="mr-2 h-5 w-5" />
                  <span className="">{blockchain.name}</span>
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
TODO:
1. Be able to select blockchain/network
  - Dynamic routing?
2. Be able to select account/wallet (Wallet per se will be added later...)
  - Dynamic routing?
3. Be able to add / delete account/wallet

4. Be able to see the balance of the account/wallet
5. Be able to see the transactions of the account/wallet
6. Be able to send transactions from the account/wallet
7. Be able to receive transactions to the account/wallet (thats obvious, more UI than functionality)

8. Be able to create new accounts.

9. Be able to see the info of the blockchain/network
10. Be able to swap (advanced)
*/
