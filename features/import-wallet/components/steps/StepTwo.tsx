import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';

interface Props {
  onNext: () => void;
  onSelectNetwork: (network: 'Ethereum' | 'Solana') => void;
}

const StepTwo: React.FC<Props> = ({ onNext, onSelectNetwork }) => {
  return (
    <div className="max-w-sm text-center">
      <div className="mb-8 flex flex-col items-center gap-2">
        <h3 className="heading mb-2 font-bold">Select Network</h3>
        <p className="text-muted-foreground">
          Typen Wallet supports Ethereum and Solana blockchains for now
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={() => {
            onSelectNetwork('Ethereum');
            onNext;
          }}
          className="flex h-12 items-center justify-start gap-2 rounded-md text-xl font-semibold"
          variant="outline"
        >
          <Icons.ethereum /> Ethereum
        </Button>
        <Button
          onClick={() => {
            onSelectNetwork('Solana');
            onNext;
          }}
          className="flex h-12 items-center justify-start gap-2 rounded-md text-xl font-semibold"
          variant="outline"
        >
          <Icons.solana />
          Solana
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
