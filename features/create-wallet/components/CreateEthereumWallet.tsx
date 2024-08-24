'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { decryptSeed, getSession, updateSession } from '@/features/auth';
import { getEthereumWallet } from '@/features/blockchains/actions';
import { getNewEthereumDerivationPath } from '@/features/import-wallet';
import { handleSubmissionError } from '@/lib/utils';

interface Props {}

const CreateEthereumWallet: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDecrypt = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      console.log({ session });
      const { encryptedSeedAndDerivationPaths, salt } = session || {};

      if (!encryptedSeedAndDerivationPaths || !salt) {
        throw new Error('No encrypted seed found');
      }

      const decrypted = await decryptSeed({
        encryptedSeed: encryptedSeedAndDerivationPaths,
        password: 'test1234', // TODO: get password from user
        salt: salt,
      });
      console.log({ decrypted });

      const { seedStr, derivationPaths } = decrypted;

      const newDerivationPath = getNewEthereumDerivationPath(derivationPaths);

      const newDerivationPaths = [...derivationPaths, newDerivationPath];

      console.log({ seedStr, newDerivationPaths });

      await updateSession({
        seed: seedStr,
        password: 'test1234', // TODO: get password from user
        derivationPaths: newDerivationPaths,
      });

      const wallets = await Promise.all(
        newDerivationPaths.map((path) => {
          return getEthereumWallet({ seed: seedStr, derivationPath: path });
        }),
      );

      console.log({ wallets });

      // await createEthereumWallet();
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
