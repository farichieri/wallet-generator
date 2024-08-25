'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { decryptSeed, updateSession } from '@/features/auth';
import { getEthereumWallet } from '@/features/blockchains/actions';
import { getNewEthereumDerivationPath } from '@/features/import-wallet';
import { handleSubmissionError } from '@/lib/utils';

interface Props {
  session: Session | null;
}

const CreateEthereumWallet: React.FC<Props> = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const handleDecrypt = async () => {
    try {
      setIsLoading(true);
      const { encryptedUserData, salt, password } = session?.user || {};

      if (!encryptedUserData || !salt || !password) {
        throw new Error('No encrypted seed found');
      }

      const res = await decryptSeed({
        encryptedSeed: encryptedUserData,
        password: password,
        salt,
      });

      console.log({ res });

      const { seedStr, derivationPaths } = res;

      const newDerivationPath = getNewEthereumDerivationPath(derivationPaths);

      const newDerivationPaths = [...derivationPaths, newDerivationPath];

      console.log({ seedStr, newDerivationPaths });

      const updatedRes = await updateSession({
        seed: seedStr,
        password: password,
        derivationPaths: newDerivationPaths,
        salt,
      });

      await update({
        user: {
          encryptedUserData: updatedRes?.encryptedSeed,
        },
      });

      const wallets = await Promise.all(
        newDerivationPaths.map((path) => {
          return getEthereumWallet({ seed: seedStr, derivationPath: path });
        }),
      );

      console.log({ wallets });

      toast.success('Ethereum wallet created successfully');
      router.refresh();
    } catch (error) {
      handleSubmissionError(error, 'Error creating Ethereum wallet');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDecrypt}
        isLoading={isLoading}
        loadingMessage="Creating Account..."
      >
        Create Ethereum Account
      </Button>
    </div>
  );
};

export default CreateEthereumWallet;
