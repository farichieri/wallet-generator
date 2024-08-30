export const revalidate = 0;

interface Props {
  params: { walletId: string; blockchainId: string };
}

export default async function Page({ params }: Props) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-24">
      <div>
        {params.walletId} on {params.blockchainId}
      </div>
    </section>
  );
}
