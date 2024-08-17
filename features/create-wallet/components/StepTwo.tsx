'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Props {
  onNext: () => void;
}

const StepTwo: React.FC<Props> = ({ onNext }) => {
  const [isSecuringWallet, setIsSecuringWallet] = useState(false);

  const handleSecureWalletOpen = () => {
    setIsSecuringWallet(true);
  };

  if (isSecuringWallet) {
    return (
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold text-center mb-4'>
          Write down your secret recovery phrase
        </h1>
        <p className='text-sm text-center text-muted-foreground'>
          Write down this 12-word Secret Recovery Phrase and save it in a place
          that you trust and only you can access.
        </p>
        <h3 className='text-xl font-bold pl-6'>Tips</h3>
        <ul className='list-disc pl-10'>
          <li className='text-sm text-muted-foreground'>
            Save in a password manager
          </li>
          <li className='text-sm text-muted-foreground'>
            Store in a safe deposit box
          </li>
          <li className='text-sm text-muted-foreground'>
            Write down and store in multiple secret places
          </li>
        </ul>

        <Button
          className='mt-4 flex'
          onClick={handleSecureWalletOpen}
          size='lg'
          type='button'
        >
          Reveal Secret Recovery Phrase
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold text-center mb-4'>
        Secure your wallet
      </h1>
      <h3 className='text-xl font-bold'>What is a Secret Recovery Phrase?</h3>
      <p className='text-sm text-muted-foreground'>
        Your Secret Recovery Phrase is a 12-word phrase that is the “master key”
        to your wallet and your funds
      </p>
      <h3 className='text-xl font-bold'>
        How do I save my Secret Recovery Phrase?
      </h3>
      <ul className='list-disc pl-10'>
        <li className='text-sm text-muted-foreground'>
          Write down the 12 words in order
        </li>
        <li className='text-sm text-muted-foreground'>
          Store it in a safe place
        </li>
        <li className='text-sm text-muted-foreground'>
          Do not store it on your computer or online
        </li>
      </ul>
      <h3 className='text-xl font-bold'>
        Should I share my Secret Recovery Phrase?
      </h3>
      <p className='text-sm text-muted-foreground'>
        Never, ever share your Secret Recovery Phrase, not even with
        WalletGenerator!
      </p>
      <span className='bg-primary/20 mt-2 p-2 rounded-lg '>
        If someone asks for your recovery phrase they are likely trying to scam
        you and steal your wallet funds.
      </span>
      <Button
        className='mt-4 flex'
        onClick={handleSecureWalletOpen}
        size='lg'
        type='button'
      >
        Secure my wallet
      </Button>
    </div>
  );
};

export default StepTwo;
