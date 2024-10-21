import { Token } from '@uniswap/sdk-core';

import { ChainId } from '../../configs/chain';

const WRON = new Token(ChainId.mainnet, '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4', 18, 'WRON', 'Wrapped RON');

const GWEI = new Token(ChainId.mainnet, '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4', 9);

const WEI = new Token(ChainId.mainnet, '0xe514d9deb7966c8be0ca922de8a064264ea6bcd4', 18);

const WETH = new Token(
  ChainId.mainnet,
  '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5',
  18,
  'WETH',
  'Ronin Wrapped Ether',
);
const AXS = new Token(ChainId.mainnet, '0x97a9107c1793bc407d6f527b77e7fff4d812bece', 18, 'AXS', 'Axie Infinity Shard');
const SLP = new Token(ChainId.mainnet, '0xa8754b9fa15fc18bb59458815510e40a12cd2014', 0, 'SLP', 'Smooth Love Potion');
const USDC = new Token(ChainId.mainnet, '0x0b7007c13325c48911f73a2dad5fa5dcbf808adc', 6, 'USDC', 'USD Coin');

const BERRY = new Token(ChainId.mainnet, '0x1b918543b518e34902e1e8dd76052bee43c762ff', 18, 'BERRY', 'Berry');
const PIXEL = new Token(ChainId.mainnet, '0x7eae20d11ef8c779433eb24503def900b9d28ad7', 18, 'PIXEL', 'Pixel');

const BANANA = new Token(ChainId.mainnet, '0x1a89ecd466a23e98f07111b0510a2d6c1cd5e400', 18, 'BANANA', 'Banana');

export { AXS, BANANA, BERRY, GWEI, PIXEL, SLP, USDC, WEI, WETH, WRON };
