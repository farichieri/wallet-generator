'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { handleSubmissionError } from '@/lib/utils';

import { signOut } from '../actions';

interface Props {}

const SignOutButton: React.FC<Props> = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      handleSubmissionError(error, 'Error signing out');
    }
  };

  return <Button onClick={handleSignOut}>SignOut</Button>;
};

export default SignOutButton;
