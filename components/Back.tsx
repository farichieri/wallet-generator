'use client';

import { useRouter } from 'next/navigation';

import { Icons } from './Icons';
import { Button } from './ui/button';

const Back = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="link"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
      >
        <Icons.chevronLeft className="h-4" />
        Back
      </Button>
    </div>
  );
};

export default Back;
