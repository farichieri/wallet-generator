'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getMessageFromCode, handleSubmissionError } from '@/lib/utils';

import { authenticate } from '../actions';

const loginFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      if (!values.password) return;
      const formData = new FormData();
      formData.append('password', values.password);
      const res = await authenticate(formData);

      if (res?.type === 'error') {
        toast.error(getMessageFromCode(res.resultCode));
      }
      router.refresh();
    } catch (error) {
      handleSubmissionError(error, 'Error signing in');
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 py-5">
      <h1 className="heading">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-xs flex-col gap-4 pt-4"
      >
        <Input
          type="password"
          placeholder="Enter your password"
          errors={errors}
          {...register('password')}
        />

        <Button
          className="mt-4 flex"
          type="submit"
          isLoading={isSubmitting}
          loadingMessage=""
          size="lg"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
