export const Blockchains = {
  Ethereum: 'ethereum',
  Solana: 'solana',
} as const;

export type Blockchain = (typeof Blockchains)[keyof typeof Blockchains];
