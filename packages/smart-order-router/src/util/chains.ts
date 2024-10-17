import { ChainId, DEFAULT_ERC20 } from '@sky-mavis/katana-core';
import { Token } from '@uniswap/sdk-core';

export const V2_SUPPORTED = [ChainId.mainnet, ChainId.testnet];

export const ID_TO_CHAIN_ID = (id: number): ChainId => {
  switch (id) {
    case 2020:
      return ChainId.mainnet;
    case 2021:
      return ChainId.testnet;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export enum ChainName {
  mainnet = 'ronin-mainnet',
  testnet = 'ronin-testnet',
}

export const NATIVE_NAMES_BY_ID: { [chainId: number]: string[] } = {
  [ChainId.mainnet]: ['RON', 'RONIN'],
  [ChainId.testnet]: ['RON', 'RONIN'],
};

export const ID_TO_NETWORK_NAME = (id: number): ChainName => {
  switch (id) {
    case 2020:
      return ChainName.testnet;
    case 2021:
      return ChainName.testnet;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export const WRAPPED_NATIVE_CURRENCY: { [chainId in ChainId]: Token } = {
  [ChainId.mainnet]: DEFAULT_ERC20[ChainId.mainnet].WRON,
  [ChainId.testnet]: DEFAULT_ERC20[ChainId.testnet].WRON,
};
