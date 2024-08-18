'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { signUp } from '@/features/auth';
import { handleSubmissionError } from '@/lib/utils';

const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    terms: z.boolean().refine((value) => value, {
      message: 'You must accept the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

interface Props {
  onNext: () => void;
}

const StepOne: React.FC<Props> = ({ onNext }) => {
  const form = useForm({
    resolver: zodResolver(createPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof createPasswordSchema>) => {
    try {
      await signUp(values.password);
      onNext();
    } catch (error) {
      handleSubmissionError(error, 'Error creating password');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 py-5">
      <h1 className="text-3xl font-bold">Create Password</h1>
      <p className="text-center text-sm text-muted-foreground">
        This password will be used to secure your wallet on this device. Make
        sure to remember it.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pt-4"
      >
        <Input
          type="password"
          placeholder="Enter your password"
          errors={errors}
          {...register('password')}
        />

        <Input
          type="password"
          placeholder="Confirm your password"
          errors={errors}
          {...register('confirmPassword')}
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            label="I have saved my secret recovery key"
            errors={errors}
            {...register('terms')}
            onCheckedChange={(value) =>
              setValue('terms', value as boolean, {
                shouldValidate: true,
              })
            }
          />
        </div>

        <Button
          className="mt-4 flex"
          type="submit"
          isLoading={isSubmitting}
          loadingMessage=""
          size="lg"
        >
          Create a new wallet
        </Button>
      </form>
    </div>
  );
};

export default StepOne;
