import { MnemonicPhraseForm } from '@/features/create-wallet';

interface Props {
  onImport: ({ mnemonic }: { mnemonic: string }) => void;
}

const StepOne: React.FC<Props> = ({ onImport }) => {
  return (
    <div>
      <div className="mb-4 flex flex-col items-center gap-2">
        <h3 className="text-3xl font-bold">Secret Recover Phrase</h3>
        <p>Enter or paste your 12-word phrase.</p>
      </div>

      <MnemonicPhraseForm
        mnemonicArray={Array(12).fill('')}
        isImport
        onConfirmWalletImport={onImport}
      />
    </div>
  );
};

export default StepOne;
