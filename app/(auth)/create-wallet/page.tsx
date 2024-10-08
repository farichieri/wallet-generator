import { WalletGenerator } from '@/features/create-account';

export const revalidate = 0;

export default async function Page() {
  return (
    <div className="flex h-auto w-full flex-1 items-center justify-center">
      <WalletGenerator />
    </div>
  );
}
