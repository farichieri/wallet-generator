'use client';

import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSubmissionError } from '@/lib/utils';

const mnemonicFormSchema = z.object({
  mnemonic: z.array(z.string()),
});

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
  const mnemonicArrayCopy = [...mnemonicArray];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * mnemonicArrayCopy.length);

    mnemonicArrayCopy[randomIndex] = '';
  }

  const form = useForm({
    resolver: zodResolver(mnemonicFormSchema),
    mode: 'onChange',
    defaultValues: {
      mnemonic: isConfirmation ? mnemonicArrayCopy : mnemonicArray,
    },
  });

  const {
    handleSubmit,
    register,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof mnemonicFormSchema>) => {
    try {
      if (!onConfirmWalletCreation) {
        throw new Error('Something went wrong');
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (JSON.stringify(values.mnemonic) !== JSON.stringify(mnemonicArray)) {
        setError('mnemonic', { message: 'Mnemonic phrase does not match' });
        throw new Error('Mnemonic phrase does not match');
      }
      toast.success('Mnemonic confirmed');
      onConfirmWalletCreation();
    } catch (error) {
      handleSubmissionError(error, 'Failed to confirm mnemonic');
    }
  };

  const areAllWordsFilled = watch('mnemonic').every((word) => word);

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
          disabled={!areAllWordsFilled || isSubmitting}
        >
          Confirm
        </Button>
      )}
    </form>
  );
};

export default MnemonicPhraseForm;
