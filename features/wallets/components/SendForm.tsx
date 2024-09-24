'use client';

import { Blockchain } from '@/features/blockchains';

interface Props {
  blockchain: Blockchain;
}

const SendForm: React.FC<Props> = ({ blockchain }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>Send {blockchain}</div>
      <span className="text-5xl font-bold">SendForm</span>
    </div>
  );
};

export default SendForm;
