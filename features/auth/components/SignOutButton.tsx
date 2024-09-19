'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { handleSubmissionError } from '@/lib/utils';

import { unAuthenticate } from '../actions';

interface Props {}

const SignOutButton: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await unAuthenticate();
      router.refresh();
    } catch (error) {
      handleSubmissionError(error, 'Error signing out');
      setIsLoading(false);
    }
  };

  return (
    <Button isLoading={isLoading} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
