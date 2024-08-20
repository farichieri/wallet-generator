'use client';

import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { handleSubmissionError } from '@/lib/utils';

export const useWalletGenerate = () => {
  const [step, setStep] = useState(1);
  const [mnemonic, setMnemonic] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const mnemonicArray = mnemonic?.split(' ');

  useEffect(() => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const seedHex = seed.toString('hex');
    console.log({ seed: seedHex, mnemonic });
    setMnemonic(mnemonic);
  }, []);

  const handleConfirm = async () => {
    try {
      setIsConfirmed(true);
      toast.success('Wallet created successfully');
    } catch (error) {
      handleSubmissionError(error, 'Error confirming wallet creation');
    }
  };

  return {
    generateMnemonic,
    handleConfirm,
    isConfirmed,
    mnemonic,
    mnemonicArray,
    setStep,
    step,
  };
};
