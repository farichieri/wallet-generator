import { useAccounts } from '../hooks';

interface Props {}

const CurrentAccount: React.FC<Props> = () => {
  const { account } = useAccounts();

  return (
    <div>
      <h2>Current Account</h2>
      <p>{account}</p>
    </div>
  );
};

export default CurrentAccount;
