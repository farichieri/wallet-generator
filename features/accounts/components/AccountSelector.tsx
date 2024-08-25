import { Session } from 'next-auth';

import { Blockchain } from '@/features/blockchains';
import { CreateEthereumWallet } from '@/features/create-wallet';

import { UserAccounts } from '../types';

interface Props {
  accounts: UserAccounts;
  blockchain: Blockchain;
  session: Session | null;
}

const AccountSelector: React.FC<Props> = ({
  accounts,
  blockchain,
  session,
}) => {
  const currentAccounts = accounts[blockchain];

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        {currentAccounts.map((path, index) => (
          <div key={index}>{path}</div>
        ))}
      </div>
      {blockchain === 'ethereum' ? (
        <CreateEthereumWallet session={session} />
      ) : (
        <div>Create Solana Wallet...</div>
      )}
    </div>
  );
};

export default AccountSelector;
