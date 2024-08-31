'use client';

import { Button } from '@/components/ui/button';

interface Props {}

const Wallet: React.FC<Props> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="text-5xl font-bold">$0.00</span>
      <div className="flex w-48 items-center gap-2">
        <Button className="flex w-full">Receive</Button>
        <Button className="flex w-full">Send</Button>
      </div>
    </div>
  );
};

export default Wallet;
