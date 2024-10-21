import { Token } from '@uniswap/sdk-core';

import { ChainId } from '../../configs/chain';

const WRON_TESTNET = new Token(
  ChainId.testnet,
  '0xa959726154953bae111746e265e6d754f48570e6',
  18,
  'WRON',
  'Wrapped Ronin',
);
const WETH_TESTNET = new Token(
  ChainId.testnet,
  '0x29c6f8349a028e1bdfc68bfa08bdee7bc5d47e16',
  18,
  'WETH',
  'Ronin Wrapped Ether',
);
const AXS_TESTNET = new Token(
  ChainId.testnet,
  '0x3c4e17b9056272ce1b49f6900d8cfd6171a1869d',
  18,
  'AXS',
  'Axie Infinity Shard',
);
const SLP_TESTNET = new Token(
  ChainId.testnet,
  '0x82f5483623d636bc3deba8ae67e1751b6cf2bad2',
  0,
  'SLP',
  'Smooth Love Potion',
);

const USDT_TESTNET = new Token(ChainId.testnet, '0x04ef1d4f687bb20eedcf05c7f710c078ba39f328', 18, 'USDT', 'USDT');
const USDC_TESTNET = new Token(ChainId.testnet, '0x067fbff8990c58ab90bae3c97241c5d736053f77', 6, 'USDC', 'USD Coin');

const BERRY_TESTNET = new Token(ChainId.testnet, '0x9280b976ad8a13cdbd8729297c7a08ce1ec90d29', 18, 'BERRY', 'Berry');
const PIXEL_TESTNET = new Token(ChainId.testnet, '0x253eF7651433ca9cA5dE487e1661a27080E85A83', 18, 'PIXEL', 'Pixel');

const BANANA_TESTNET = new Token(ChainId.testnet, '0xe61f92378450772495625d33f4a8daed8e870d83', 18, 'BANANA', 'Banana');

export {
  AXS_TESTNET,
  BANANA_TESTNET,
  BERRY_TESTNET,
  PIXEL_TESTNET,
  SLP_TESTNET,
  USDC_TESTNET,
  USDT_TESTNET,
  WETH_TESTNET,
  WRON_TESTNET,
};
