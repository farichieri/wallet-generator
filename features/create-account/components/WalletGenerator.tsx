'use client';

import Link from 'next/link';
import React from 'react';

import { Icons } from '@/components/Icons';
import Steps from '@/components/Steps';

import { StepOne, StepThree, StepTwo } from './steps';
import WalletConfirmation from './WalletConfirmation';
import { useWalletGenerate } from '../hooks';

interface Props {}

const WalletGenerator: React.FC<Props> = () => {
  const {
    handleConfirm,
    isConfirmed,
    mnemonic,
    mnemonicArray,
    setStep,
    step,
    setPassword,
  } = useWalletGenerate();

  const stepsConfig = [
    {
      title: 'Create Password',
      content: <StepOne onNext={() => setStep(2)} setPassword={setPassword} />,
    },
    {
      title: 'Secure Wallet',
      content: (
        <StepTwo
          mnemonic={mnemonic}
          mnemonicArray={mnemonicArray}
          onNext={() => setStep(3)}
        />
      ),
    },
    {
      title: 'Confirm secret recovery key',
      content: (
        <StepThree
          mnemonicArray={mnemonicArray}
          onConfirmWalletCreation={handleConfirm}
        />
      ),
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto flex w-full max-w-lg flex-col overflow-auto rounded-3xl border">
        {isConfirmed ? (
          <div className="p-10">
            <WalletConfirmation />
          </div>
        ) : (
          <>
            <Steps
              step={step}
              steps={stepsConfig.map(({ title }) => ({ title }))}
            />
            <div className="p-10">{stepsConfig[step - 1]?.content}</div>
          </>
        )}
      </div>

      {isConfirmed && (
        <Link
          className="link absolute bottom-[-35px] left-1/2 flex translate-x-[-50%] items-center gap-1"
          href={'https://x.com/farichieri'}
          target="_blank"
        >
          Follow me on Twitter <Icons.x />
        </Link>
      )}
    </section>
  );
};

export default WalletGenerator;
