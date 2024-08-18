'use client';

import MnemonicPhraseForm from '../MnemonicPhraseForm';

interface Props {
  mnemonicArray: string[];
  onConfirmWalletCreation: () => void;
}

const StepThree: React.FC<Props> = ({
  onConfirmWalletCreation,
  mnemonicArray,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Confirm Secret Recovery Phrase
      </h1>
      <MnemonicPhraseForm
        isConfirmation
        mnemonicArray={mnemonicArray}
        onConfirmWalletCreation={onConfirmWalletCreation}
      />
    </div>
  );
};

export default StepThree;
