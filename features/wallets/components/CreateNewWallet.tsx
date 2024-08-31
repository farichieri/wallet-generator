'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Blockchain } from '@/features/blockchains';
import { createEthereumWallet } from '@/features/create-account';
import { handleSubmissionError } from '@/lib/utils';

interface Props {
  blockchain: Blockchain;
}

const CreateNewWallet: React.FC<Props> = ({ blockchain }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const handleCreate = async () => {
    try {
      setIsLoading(true);

      let res;

      if (blockchain === 'ethereum') {
        res = await createEthereumWallet();
      }

      if (!res) {
        throw new Error(`Error creating ${blockchain} wallet`);
      }

      await update({
        user: {
          encryptedUserData: res?.encryptedSeed,
        },
      });

      toast.success(`Successfully created ${blockchain} wallet`);
    } catch (error) {
      handleSubmissionError(error, `Error creating ${blockchain} wallet`);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleCreate}
        isLoading={isLoading}
        loadingMessage={`Creating ${blockchain} wallet...`}
      >
        + Add new <span>{blockchain}</span> Wallet
      </Button>
    </div>
  );
};

export default CreateNewWallet;
