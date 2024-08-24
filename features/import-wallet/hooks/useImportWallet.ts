'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { handleSubmissionError } from '@/lib/utils';

export const useImportWallet = () => {
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState<'Solana' | 'Ethereum' | null>(
    'Ethereum',
  );
  const [mnemonic, setMnemonic] = useState('');
  const [derivationPaths, setDerivationPaths] = useState<string[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleImport = async ({ mnemonic }: { mnemonic: string }) => {
    try {
      setMnemonic(mnemonic);
      setStep(2);
    } catch (error) {
      handleSubmissionError(error, 'Failed to import wallet');
    }
  };

  const handleSelectDerivationPath: React.ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    const path = e.target.value;
    if (derivationPaths.includes(path)) {
      setDerivationPaths(derivationPaths.filter((p) => p !== path));
    } else {
      setDerivationPaths([...derivationPaths, path]);
    }
  };

  const handleNext = () => {
    if (step === 4) {
      toast.success('Wallet imported successfully');
    }
    setStep(step + 1);
  };

  const handleSelectNetwork = (network: 'Ethereum' | 'Solana') => {
    setNetwork(network);
    setStep(3);
  };

  const handleSelectStep = (index: number) => {
    if (index + 1 > step) return;
    setStep(index + 1);
  };

  return {
    derivationPaths,
    handleImport,
    handleNext,
    handleSelectDerivationPath,
    handleSelectNetwork,
    handleSelectStep,
    isConfirmed,
    mnemonic,
    network,
    step,
  };
};
