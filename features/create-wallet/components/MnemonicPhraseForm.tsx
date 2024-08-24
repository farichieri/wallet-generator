'use client';

import { ErrorMessage } from '@hookform/error-message';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useMnemonicForm } from '../hooks/useMnemonicForm';

interface Props {
  isConfirmation?: boolean;
  isImport?: boolean;
  mnemonicArray: string[];
  onConfirmWalletCreation?: () => void;
  onConfirmWalletImport?: ({ mnemonic }: { mnemonic: string }) => void;
}

const MnemonicPhraseForm: React.FC<Props> = ({
  isConfirmation,
  isImport,
  mnemonicArray,
  onConfirmWalletCreation,
  onConfirmWalletImport,
}) => {
  const {
    areAllWordsFilled,
    errors,
    handleSubmit,
    isSubmitting,
    register,
    onSubmit,
    watch,
    handlePaste,
  } = useMnemonicForm({
    mnemonicArray,
    onConfirmWalletCreation,
    onConfirmWalletImport,
    isConfirmation,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} onPaste={handlePaste}>
      <div className="relative grid grid-cols-3 gap-2 rounded-xl bg-muted p-8 text-background">
        {mnemonicArray.map((word, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-1 text-left text-foreground"
          >
            <span className="w-7 text-sm">{index + 1}.</span>
            <Input
              className="w-full rounded-md border border-muted-foreground/50 px-1 text-center"
              autoComplete="off"
              autoCorrect="off"
              autoSave="off"
              autoFocus={index === 0}
              autoCapitalize="off"
              value={
                isConfirmation || isImport
                  ? watch(`mnemonic.${index}` as const)
                  : word
              }
              required
              {...register(`mnemonic.${index}` as const)}
            />
          </div>
        ))}
      </div>
      <ErrorMessage
        name="mnemonic"
        errors={errors}
        render={({ message }) => (
          <span className="mt-2 flex w-fit justify-center rounded-lg bg-destructive/80 p-1 text-sm text-foreground">
            {message}
          </span>
        )}
      />

      {isImport && (
        <Button
          className="mx-auto mt-4 flex px-10"
          disabled={!areAllWordsFilled}
          isLoading={isSubmitting}
          size="lg"
          type="submit"
        >
          Import
        </Button>
      )}

      {isConfirmation && (
        <Button
          className="mt-4 flex w-full"
          disabled={!areAllWordsFilled}
          isLoading={isSubmitting}
          size="lg"
          type="submit"
        >
          Confirm
        </Button>
      )}
    </form>
  );
};

export default MnemonicPhraseForm;
