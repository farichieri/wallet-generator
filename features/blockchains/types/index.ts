export const Blockchains = {
  ethereum: 'ethereum',
  solana: 'solana',
} as const;

export type Blockchain = (typeof Blockchains)[keyof typeof Blockchains];

export const BlockchainsWithLogos = {
  [Blockchains.ethereum]: {
    name: 'Ethereum',
    logo: 'ethereum',
  },
  [Blockchains.solana]: {
    name: 'Solana',
    logo: 'solana',
  },
} as const;
