'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Blockchain } from '@/features/blockchains';
import { handleSubmissionError } from '@/lib/utils';

const sendFormSchema = z.object({
  amount: z
    .string()
    .min(1, { message: 'Password must be at least 1 characters' }),
  recipientAddress: z
    .string()
    .min(8, { message: 'Password must be at least 20 characters' }),
});

interface Props {
  blockchain: Blockchain;
}

const SendForm: React.FC<Props> = ({ blockchain }) => {
  const form = useForm({
    resolver: zodResolver(sendFormSchema),
    mode: 'onChange',
    defaultValues: {
      amount: '',
      recipientAddress: '',
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof sendFormSchema>) => {
    try {
      console.log({ values });
    } catch (error) {
      handleSubmissionError(error, 'Error creating password');
    }
  };
  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>Send {blockchain}</div>
      <span className="text-5xl font-bold">SendForm</span>
      <Input
        className="w-full"
        placeholder="Amount"
        type="number"
        errors={errors}
        {...register('amount')}
      />
      <Input
        className="w-full"
        placeholder="Recipient"
        type="text"
        errors={errors}
        {...register('recipientAddress')}
      />
      <Button type="submit">Send</Button>
    </form>
  );
};

export default SendForm;
