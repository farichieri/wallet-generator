'use client';

import MnemonicPhraseForm from './MnemonicPhraseForm';

interface Props {
  onNext: () => void;
  mnemonicArray: string[];
}

const StepThree: React.FC<Props> = ({ onNext, mnemonicArray }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Confirm Secret Recovery Phrase
      </h1>
      <MnemonicPhraseForm mnemonicArray={mnemonicArray} isConfirmation />
    </div>
  );
};

export default StepThree;
