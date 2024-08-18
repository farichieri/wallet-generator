'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface Props {}

const WalletConfirmation: React.FC<Props> = () => {
  return (
    <div className="relative flex flex-col gap-4">
      <div className="mx-auto">🚀</div>
      <h1 className="mb-4 text-center text-3xl font-bold">
        Wallet creation successful
      </h1>
      <p className="text-center">
        You've successfully protected your wallet. Keep your Secret Recovery
        Phrase safe and secret -- it's your responsibility!
      </p>
      <p className="text-center">Remember:</p>
      <ul className="space-y-1 pl-4">
        <li>WalletGenerator can't recover your Secret Recovery Phrase.</li>
        <li>
          WalletGenerator will never ask you for your Secret Recovery Phrase.
        </li>
        <li>
          Never share your Secret Recovery Phrase with anyone or risk your funds
          being
        </li>
      </ul>
      <Link href="/dashboard">
        <Button className="mt-4 w-full" size="lg">
          Got it
        </Button>
      </Link>
    </div>
  );
};

export default WalletConfirmation;
