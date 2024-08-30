import { useAccounts } from '../hooks';

interface Props {}

const CurrentWallet: React.FC<Props> = () => {
  const { account } = useAccounts();

  return (
    <div>
      <h2>Current Account</h2>
      <p>{account}</p>
    </div>
  );
};

export default CurrentWallet;
