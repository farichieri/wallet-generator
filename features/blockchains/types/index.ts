export const Blockchains = {
  ethereum: 'ethereum',
  solana: 'solana',
} as const;

export type Blockchain = (typeof Blockchains)[keyof typeof Blockchains];

export const BlockchainsWithLogos = {
  [Blockchains.ethereum]: {
    name: 'ethereum',
    logo: 'ethereum',
  },
  [Blockchains.solana]: {
    name: 'solana',
    logo: 'solana',
  },
} as const;
