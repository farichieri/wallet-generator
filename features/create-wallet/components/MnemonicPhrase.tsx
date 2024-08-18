'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import MnemonicPhraseForm from './MnemonicPhraseForm';

interface Props {
  isSecuringWallet: boolean;
  onNext: () => void;
  mnemonicArray: string[];
  mnemonic: string;
}

const MnemonicPhrase: React.FC<Props> = ({
  isSecuringWallet,
  onNext,
  mnemonic,
  mnemonicArray,
}) => {
  const [isMnemonicCopied, setIsMnemonicCopied] = useState(false);
  const [isMnemonicRevealed, setIsMnemonicRevealed] = useState(false);

  const handleToggleMnemonic = () => {
    setIsMnemonicRevealed((prevState) => !prevState);
    setIsMnemonicCopied(false);
  };

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(mnemonic);
    toast.success('Copied to clipboard 🚀');
    setIsMnemonicCopied(true);
  };

  if (isSecuringWallet) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Write down your secret recovery phrase
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Write down this 12-word Secret Recovery Phrase and save it in a place
          that you trust and only you can access.
        </p>
        <h3 className="pl-6 text-xl font-bold">Tips</h3>
        <ul className="list-disc pl-10">
          <li className="text-sm text-muted-foreground">
            Save in a password manager
          </li>
          <li className="text-sm text-muted-foreground">
            Store in a safe deposit box
          </li>
          <li className="text-sm text-muted-foreground">
            Write down and store in multiple secret places
          </li>
        </ul>

        {mnemonic && (
          <div
            className={cn('relative rounded-xl bg-foreground text-background')}
          >
            {!isMnemonicRevealed && (
              <div
                className={cn(
                  'absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center font-semibold backdrop-blur-sm',
                )}
              >
                <Button
                  onClick={handleToggleMnemonic}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <Icons.eye className="h-5" />
                </Button>
                Make sure nobody is looking
              </div>
            )}
            <MnemonicPhraseForm mnemonicArray={mnemonicArray} />
          </div>
        )}

        {isMnemonicRevealed && (
          <div className="flex items-center justify-between">
            <Button
              className="flex items-center gap-2"
              onClick={handleToggleMnemonic}
              size="sm"
              type="button"
              variant="ghostLink"
            >
              <Icons.eyeOff className="h-4" />
              Hide Seed Phrase
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={handleCopyMnemonic}
              size="sm"
              type="button"
              variant="ghostLink"
              disabled={isMnemonicCopied}
            >
              <Icons.copy className="h-4" />
              {isMnemonicCopied ? 'Copied' : 'Copy to clipboard'}
            </Button>
          </div>
        )}
        {!isMnemonicRevealed ? (
          <Button
            className="mt-4 flex"
            onClick={handleToggleMnemonic}
            size="lg"
            type="button"
          >
            Reveal Secret Recovery Phrase
          </Button>
        ) : (
          <Button
            className="mt-4 flex"
            onClick={onNext}
            size="lg"
            type="button"
          >
            Next
          </Button>
        )}
      </div>
    );
  }
};

export default MnemonicPhrase;
