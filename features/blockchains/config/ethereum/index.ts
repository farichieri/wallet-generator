import { ethers } from 'ethers';

import { EthereumConnectionUrl } from './connection-url';
import { EthereumExplorer } from './explorer';
import { Blockchains } from '../../types';

export const ethereumBlockchainConfig = {
  defaultRpcUrl: EthereumConnectionUrl.MAINNET,
  blowfishUrl:
    'https://blowfish.xnftdata.com/ethereum/v0/mainnet/scan/transactions',
  isTestnet: false,

  Enabled: true,
  Blockchain: Blockchains.ethereum,
  Name: 'Ethereum',
  GasTokenName: 'ETH',
  GasTokenDecimals: 18,
  AppTokenName: 'ERC20',
  RampSupportedTokens: [
    {
      title: 'ETH',
      subtitle: 'Ethereum',
      icon: '/ethereum.png',
    },
  ],

  DerivationPathPrefix: "m/44'/60'",
  DerivationPathRequireHardening: false,
  DerivationPathOptions: [
    {
      label: 'default',
      pattern: "m/44'/60'/x'/0'",
    },
  ],

  PreferencesDefault: {
    explorer: EthereumExplorer.DEFAULT,
    connectionUrl: EthereumConnectionUrl.DEFAULT,
    chainId: '0x1',
  },
  validatePublicKey: (address: string) => {
    try {
      ethers.getAddress(address);
    } catch (e) {
      return false;
    }
    return true;
  },
  logoUri:
    'https://s3.us-east-1.amazonaws.com/app-assets.xnfts.dev/images/useBlockchainLogo/ethereum.png',
  bip44CoinType: 60,
  localLogoUri: './ethereum.png',
  requiresChainId: true,
  RpcConnectionUrls: {
    MAINNET: {
      name: 'Mainnet',
      url: EthereumConnectionUrl.MAINNET,
      chainId: '0x1',
    },
    SEPOLIA: {
      name: 'Sepolia',
      url: EthereumConnectionUrl.SEPOLIA,
      chainId: '0xaa36a7',
    },
  },
};
