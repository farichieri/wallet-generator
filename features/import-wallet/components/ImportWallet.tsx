'use client';

import Link from 'next/link';

import { Icons } from '@/components/Icons';
import Steps from '@/components/Steps';
import { CreatePasswordForm } from '@/features/auth';
import WalletConfirmation from '@/features/create-wallet/components/WalletConfirmation';

import { StepOne, StepThree, StepTwo } from './steps';
import { useImportWallet } from '../hooks';

interface Props {}

const ImportWallet: React.FC<Props> = () => {
  const {
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
  } = useImportWallet();

  const stepsConfig = [
    {
      title: 'Import Wallet',
      content: <StepOne onImport={handleImport} />,
    },
    {
      title: 'Select Network',
      content: (
        <StepTwo onSelectNetwork={handleSelectNetwork} onNext={handleNext} />
      ),
    },
    {
      title: 'Select wallet(s)',
      content: (
        <StepThree
          networkSelected={network}
          onNext={handleNext}
          handleSelectDerivationPath={handleSelectDerivationPath}
          derivationPaths={derivationPaths}
        />
      ),
    },
    {
      title: 'Create Password',
      content: (
        <div>
          <CreatePasswordForm
            mnemonic={mnemonic}
            onNext={handleNext}
            derivationPaths={derivationPaths}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="relative flex w-full">
      <div className="mx-auto flex w-full max-w-3xl flex-col overflow-auto rounded-3xl border">
        {isConfirmed ? (
          <div className="p-10">
            <WalletConfirmation />
          </div>
        ) : (
          <>
            <Steps
              step={step}
              steps={stepsConfig.map(({ title }) => ({ title }))}
              onSelect={handleSelectStep}
            />
            <div className="flex items-center justify-center p-10">
              {stepsConfig[step - 1]?.content}
            </div>
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

export default ImportWallet;
