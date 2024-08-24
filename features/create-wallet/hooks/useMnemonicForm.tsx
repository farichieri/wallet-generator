import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { handleSubmissionError } from '@/lib/utils';

const mnemonicFormSchema = z.object({
  mnemonic: z.array(z.string()),
});

interface Props {
  mnemonicArray: string[];
  onConfirmWalletCreation?: () => void;
  onConfirmWalletImport?: ({ mnemonic }: { mnemonic: string }) => void;
  isConfirmation?: boolean;
}

export const useMnemonicForm = ({
  mnemonicArray,
  onConfirmWalletCreation,
  onConfirmWalletImport,
  isConfirmation,
}: Props) => {
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
    setValue,
    formState: { isSubmitting, errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof mnemonicFormSchema>) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (
        isConfirmation &&
        JSON.stringify(values.mnemonic) !== JSON.stringify(mnemonicArray)
      ) {
        setError('mnemonic', { message: 'Mnemonic phrase does not match' });
        throw new Error('Mnemonic phrase does not match');
      }

      if (!onConfirmWalletCreation && !onConfirmWalletImport) {
        throw new Error('Something went wrong');
      }

      onConfirmWalletCreation && onConfirmWalletCreation();
      onConfirmWalletImport &&
        onConfirmWalletImport({ mnemonic: values.mnemonic.join(' ') });
    } catch (error) {
      handleSubmissionError(error, 'Failed to confirm mnemonic');
    }
  };

  const areAllWordsFilled = watch('mnemonic').every((word) => word);

  const handlePaste = (event: React.ClipboardEvent<HTMLFormElement>) => {
    const pastedText = event.clipboardData.getData('text');
    const words = pastedText.trim().split(/\s+/);

    if (words.length === mnemonicArray.length) {
      event.preventDefault();

      words.forEach((word, index) => {
        setValue(`mnemonic.${index}`, word);
      });
    }
  };

  return {
    areAllWordsFilled,
    errors,
    form,
    handleSubmit,
    isSubmitting,
    mnemonicArray,
    register,
    onSubmit,
    watch,
    handlePaste,
  };
};
