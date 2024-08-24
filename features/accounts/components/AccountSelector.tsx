import { Blockchain } from '@/features/blockchains';
import { CreateEthereumWallet } from '@/features/create-wallet';

import { UserAccounts } from '../types';

interface Props {
  accounts: UserAccounts;
  blockchain: Blockchain;
}

const AccountSelector: React.FC<Props> = ({ accounts, blockchain }) => {
  const currentAccounts = accounts[blockchain];

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        {currentAccounts.map((path, index) => (
          <div key={index}>{path}</div>
        ))}
      </div>
      {blockchain === 'ethereum' ? (
        <CreateEthereumWallet />
      ) : (
        <div>Create Solana Wallet...</div>
      )}
    </div>
  );
};

export default AccountSelector;
