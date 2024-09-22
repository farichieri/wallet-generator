'use client';

import { useState } from 'react';

import { CustomModal } from '@/components/CustomModal';
import { Button } from '@/components/ui/button';

interface Props {
  walletId: string;
  balance: string | null;
}

const Wallet: React.FC<Props> = ({ walletId, balance }) => {
  const [isSendOpen, setIsSendOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-5xl font-bold">{balance}</span>
      <div className="flex w-48 items-center gap-2">
        <Button className="flex w-full">Receive</Button>
        <Button className="flex w-full" onClick={() => setIsSendOpen(true)}>
          Send
        </Button>
      </div>
      {isSendOpen && (
        <CustomModal
          open={isSendOpen}
          onClose={() => setIsSendOpen(false)}
          showCloseButton={false}
        >
          Send Modal
        </CustomModal>
      )}
    </div>
  );
};

export default Wallet;
