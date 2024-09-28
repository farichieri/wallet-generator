import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

import {
  getEthereumDerivationPath,
  getSolanaDerivationPath,
} from '../../utils';

interface Props {
  onNext: () => void;
  networkSelected: 'Ethereum' | 'Solana' | null;
  handleSelectDerivationPath: React.ChangeEventHandler<HTMLInputElement>;
  derivationPaths: string[];
}

const StepThree: React.FC<Props> = ({
  onNext,
  networkSelected,
  handleSelectDerivationPath,
  derivationPaths,
}) => {
  const readyToImport = derivationPaths.length > 0;

  return (
    <div className="w-full text-center">
      {networkSelected === 'Ethereum' ? (
        <div className="flex flex-col gap-2">
          <h3 className="mb-4 text-2xl text-muted-foreground">
            Select one or more wallets to import
          </h3>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="flex flex-col gap-2 p-3">
              {Array(19)
                .fill(null)
                .map((_, index) => (
                  <DerivationPathRow
                    key={index}
                    index={index}
                    derivationPath={getEthereumDerivationPath(index)}
                    checked={derivationPaths.includes(
                      getEthereumDerivationPath(index),
                    )}
                    handleSelectDerivationPath={handleSelectDerivationPath}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div>
          <p>Select one or more wallets to import</p>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="flex flex-col gap-2 p-3">
              {Array(19)
                .fill(null)
                .map((_, index) => (
                  <DerivationPathRow
                    key={index}
                    index={index}
                    derivationPath={getSolanaDerivationPath(index)}
                    checked={derivationPaths.includes(
                      getSolanaDerivationPath(index),
                    )}
                    handleSelectDerivationPath={handleSelectDerivationPath}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button
          onClick={onNext}
          className=""
          size="lg"
          disabled={!readyToImport}
        >
          Import Wallet{derivationPaths.length > 1 ? 's' : ''}
        </Button>
      </div>
    </div>
  );
};

const DerivationPathRow: React.FC<{
  index: number;
  derivationPath: string;
  checked: boolean;
  handleSelectDerivationPath: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ index, derivationPath, checked, handleSelectDerivationPath }) => {
  const checkboxId = `checkbox-${index}`;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'flex cursor-pointer items-center gap-4 rounded-md border border-muted px-4 duration-300 hover:bg-muted/50',
        {
          'bg-muted': checked,
        },
      )}
    >
      <div>
        <Input
          id={checkboxId}
          className="w-fit"
          type="checkbox"
          value={derivationPath}
          checked={checked}
          onChange={handleSelectDerivationPath}
        />
      </div>
      <p>
        Wallet {index + 1} - Path: {derivationPath}
      </p>
    </label>
  );
};

export default StepThree;
