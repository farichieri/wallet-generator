'use server';

interface Props {
  blockchain: string;
  walletAddress: string;
}

export const sendCrypto = async ({ blockchain, walletAddress }: Props) => {
  switch (blockchain) {
    case 'ethereum':
      break;
    case 'solana':
    default:
      return null;
  }
};
