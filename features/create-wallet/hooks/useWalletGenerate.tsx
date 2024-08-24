'use client';

import { generateMnemonic } from 'bip39';
import { useEffect, useState } from 'react';

import { Blockchain } from '@/features/blockchains';
import { handleSubmissionError } from '@/lib/utils';

import { createEthereumWallet } from '../actions';

export const useWalletGenerate = () => {
  const [step, setStep] = useState(1);
  const [mnemonic, setMnemonic] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [password, setPassword] = useState('');

  const mnemonicArray = mnemonic?.split(' ');

  useEffect(() => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
  }, []);

  const handleConfirm = async () => {
    try {
      setIsConfirmed(true);
    } catch (error) {
      handleSubmissionError(error, 'Error confirming wallet creation');
    }
  };

  const createWallet = async ({ blockchain }: { blockchain: Blockchain }) => {
    try {
      switch (blockchain) {
        case 'ethereum':
          return createEthereumWallet({ mnemonic, index: 0 });
        case 'solana':
          // return createSolanaWallet({ mnemonic });
          break;
        default:
          throw new Error('Blockchain not supported');
      }
    } catch (error) {
      handleSubmissionError(error, 'Error creating wallet');
    }
  };

  return {
    createWallet,
    generateMnemonic,
    handleConfirm,
    isConfirmed,
    mnemonic,
    mnemonicArray,
    setPassword,
    setStep,
    step,
  };
};
