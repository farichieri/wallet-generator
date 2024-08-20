'use client';

import { ErrorMessage } from '@hookform/error-message';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useMnemonicForm } from '../hooks/useMnemonicForm';

interface Props {
  isConfirmation?: boolean;
  mnemonicArray: string[];
  onConfirmWalletCreation?: () => void;
}

const MnemonicPhraseForm: React.FC<Props> = ({
  isConfirmation,
  mnemonicArray,
  onConfirmWalletCreation,
}) => {
  const {
    areAllWordsFilled,
    errors,
    handleSubmit,
    isSubmitting,
    register,
    onSubmit,
    watch,
  } = useMnemonicForm({
    mnemonicArray,
    onConfirmWalletCreation,
    isConfirmation,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative grid grid-cols-3 gap-2 rounded-xl bg-foreground p-8 text-background">
        {mnemonicArray.map((word, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-1 text-left"
          >
            <span className="w-7 text-sm">{index + 1}.</span>
            <Input
              className="w-full rounded-md border border-muted-foreground/50 px-1 text-center"
              value={
                isConfirmation ? watch(`mnemonic.${index}` as const) : word
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

      {isConfirmation && (
        <Button
          className="mt-4 flex w-full"
          size="lg"
          type="submit"
          disabled={!areAllWordsFilled}
          isLoading={isSubmitting}
        >
          Confirm
        </Button>
      )}
    </form>
  );
};

export default MnemonicPhraseForm;
