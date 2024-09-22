export const DEFAULT_SOLANA_CLUSTER =
  'https://solana-mainnet.g.alchemy.com/v2/9JX1rQJZL-sABV7VimnipiTcV3R2jQZJ';
export const SolanaCluster = {
  MAINNET: DEFAULT_SOLANA_CLUSTER,
  DEVNET:
    'https://solana-devnet.g.alchemy.com/v2/9JX1rQJZL-sABV7VimnipiTcV3R2jQZJ',
  DEFAULT: process.env.DEFAULT_SOLANA_CONNECTION_URL || DEFAULT_SOLANA_CLUSTER,
};
