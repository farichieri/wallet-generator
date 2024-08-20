import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { handleSubmissionError } from '@/lib/utils';

import { createEthersWallet } from '../actions';

const mnemonicFormSchema = z.object({
  mnemonic: z.array(z.string()),
});

interface Props {
  mnemonicArray: string[];
  onConfirmWalletCreation?: () => void;
  isConfirmation?: boolean;
}

export const useMnemonicForm = ({
  mnemonicArray,
  onConfirmWalletCreation,
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

      await createEthersWallet({ mnemonic: values.mnemonic.join(' ') });

      onConfirmWalletCreation();
    } catch (error) {
      handleSubmissionError(error, 'Failed to confirm mnemonic');
    }
  };

  const areAllWordsFilled = watch('mnemonic').every((word) => word);

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
  };
};
