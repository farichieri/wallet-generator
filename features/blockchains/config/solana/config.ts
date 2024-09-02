import { PublicKey } from '@solana/web3.js';

import { SolanaCluster } from './connection-url';
import { SolanaExplorer } from './explorer';
import { Blockchains } from '../../types';
const remoteLogoUri =
  'https://s3.us-east-1.amazonaws.com/app-assets.xnfts.dev/images/useBlockchainLogo/solana.png';
const bip44CoinType = 501;

export const solanaBlockchainConfig = {
  caip2Id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp', // caip-2 "namespace:reference"
  caip2Namespace: 'solana',
  caip2Reference: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',

  defaultRpcUrl: SolanaCluster.MAINNET,
  blowfishUrl:
    'https://blowfish.xnftdata.com/solana/v0/mainnet/scan/transactions',
  isTestnet: false,

  Enabled: true,
  Blockchain: Blockchains.solana,
  Name: 'Solana',
  GasTokenName: 'SOL',
  GasTokenDecimals: 9,
  AppTokenName: 'SPL',

  RampSupportedTokens: [
    {
      title: 'SOL',
      icon: remoteLogoUri,
      subtitle: 'Solana',
    },
  ],
  DerivationPathPrefix: "m/44'/501'",
  DerivationPathRequireHardening: true,
  DerivationPathOptions: [
    {
      label: 'Default',
      pattern: "m/44'/501'/x'/0'",
    },
  ],
  PreferencesDefault: {
    explorer: SolanaExplorer.DEFAULT,
    connectionUrl: SolanaCluster.DEFAULT,
    commitment: 'confirmed',
  },
  validatePublicKey: (address: string) => {
    try {
      new PublicKey(address);
    } catch (err) {
      return false;
    }
    return true;
  },
  logoUri: remoteLogoUri,
  bip44CoinType: bip44CoinType,
  localLogoUri: './solana.png',
  requiresChainId: false,
  RpcConnectionUrls: {
    MAINNET: {
      name: 'Mainnet (Beta)',
      url: SolanaCluster.MAINNET,
    },
    // DEVNET: {
    //   name: "Devnet",
    //   url: SolanaCluster.DEVNET,
    // },
  },
  ConfirmationCommitments: {
    Processed: {
      commitment: 'processed',
    },
    Confirmed: {
      commitment: 'confirmed',
    },
    Finalized: {
      commitment: 'finalized',
    },
  },
  Explorers: {
    'Solana Beach': {
      url: SolanaExplorer.SOLANA_BEACH,
    },
    'Solana Explorer': {
      url: SolanaExplorer.SOLANA_EXPLORER,
    },
    'Solana FM': {
      url: SolanaExplorer.SOLANA_FM,
    },
    Solscan: {
      url: SolanaExplorer.SOLSCAN,
    },
    XRAY: {
      url: SolanaExplorer.XRAY,
    },
  },
};
