'use client';

import { Toaster } from 'sonner';

interface Props {
  children: React.ReactNode;
}

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Provider;
