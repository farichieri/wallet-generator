'use client';

import React, { useState } from 'react';

import StepOne from './StepOne';
import { Steps } from './Steps';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

interface Props {}

const WalletGenerator: React.FC<Props> = () => {
  const [step, setStep] = useState(1);

  const stepsConfig = [
    {
      title: 'Create Password',
      content: <StepOne onNext={() => setStep(2)} />,
    },
    {
      title: 'Secure Wallet',
      content: <StepTwo onNext={() => setStep(3)} />,
    },
    {
      title: 'Confirm secret recovery key',
      content: <StepThree onNext={() => setStep(3)} />,
    },
  ];

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col overflow-auto rounded-3xl border">
      <Steps steps={stepsConfig.map(({ title }) => ({ title }))} step={step} />
      <div className="p-10">{stepsConfig[step - 1]?.content}</div>
    </section>
  );
};

export default WalletGenerator;
