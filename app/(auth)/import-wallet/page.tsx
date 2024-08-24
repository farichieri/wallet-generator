import { ImportWallet } from '@/features/import-wallet';

export const revalidate = 0;

export default async function Home() {
  return (
    <div className="flex h-auto w-full flex-1 items-center justify-center">
      <ImportWallet />
    </div>
  );
}
