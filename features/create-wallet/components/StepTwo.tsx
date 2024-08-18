'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import MnemonicPhrase from './MnemonicPhrase';

interface Props {
  onNext: () => void;
  mnemonicArray: string[];
  mnemonic: string;
}

const StepTwo: React.FC<Props> = ({ onNext, mnemonicArray, mnemonic }) => {
  const [isSecuringWallet, setIsSecuringWallet] = useState(false);

  const handleSecureWalletOpen = () => {
    setIsSecuringWallet(true);
  };

  if (isSecuringWallet) {
    return (
      <MnemonicPhrase
        isSecuringWallet={isSecuringWallet}
        onNext={onNext}
        mnemonic={mnemonic}
        mnemonicArray={mnemonicArray}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Secure your wallet
      </h1>
      <h3 className="text-xl font-bold">What is a Secret Recovery Phrase?</h3>
      <p className="text-sm text-muted-foreground">
        Your Secret Recovery Phrase is a 12-word phrase that is the “master key”
        to your wallet and your funds
      </p>
      <h3 className="text-xl font-bold">
        How do I save my Secret Recovery Phrase?
      </h3>
      <ul className="list-disc pl-10">
        <li className="text-sm text-muted-foreground">
          Write down the 12 words in order
        </li>
        <li className="text-sm text-muted-foreground">
          Store it in a safe place
        </li>
        <li className="text-sm text-muted-foreground">
          Do not store it on your computer or online
        </li>
      </ul>
      <h3 className="text-xl font-bold">
        Should I share my Secret Recovery Phrase?
      </h3>
      <p className="text-sm text-muted-foreground">
        Never, ever share your Secret Recovery Phrase, not even with
        WalletGenerator!
      </p>
      <span className="mt-2 rounded-lg bg-primary/20 p-2 ">
        If someone asks for your recovery phrase they are likely trying to scam
        you and steal your wallet funds.
      </span>
      <Button
        className="mt-4 flex"
        onClick={handleSecureWalletOpen}
        size="lg"
        type="button"
      >
        Secure my wallet
      </Button>
    </div>
  );
};

export default StepTwo;
