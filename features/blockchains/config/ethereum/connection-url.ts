export const EthereumConnectionUrl = {
  MAINNET: `https://eth-mainnet.g.alchemy.com/v2/9JX1rQJZL-sABV7VimnipiTcV3R2jQZJ`,
  SEPOLIA:
    'https://eth-sepolia.g.alchemy.com/v2/9JX1rQJZL-sABV7VimnipiTcV3R2jQZJ',
  DEFAULT:
    process.env.DEFAULT_ETHEREUM_CONNECTION_URL ||
    'https://swr.xnftdata.com/ethereum-rpc-proxy',
};

export const EthereumChainIds = {
  '0x1': 'MAINNET',
  '0xaa36a7': 'SEPOLIA',
};

export const EthereumExplorer = {
  ETHERSCAN: 'https://etherscan.io',
  DEFAULT: 'https://etherscan.io',
};
