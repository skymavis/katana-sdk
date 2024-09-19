import { ChainId } from 'configs/chain';

type AddressMap = Record<ChainId, string>;

const MULTICALL2_ADDRESSES: AddressMap = {
  [ChainId.testnet]: '0x31c9ef8a631e2489e69833df3b2cb4bf0dc413bc',
  [ChainId.mainnet]: '0xc76d0d0d3aa608190f78db02bf2f5aef374fc0b9',
};

const PYTH_ADDRESSES: AddressMap = {
  [ChainId.testnet]: '0xa2aa501b19aff244d90cc15a4cf739d2725b5729',
  [ChainId.mainnet]: '0x2880ab155794e7179c9ee2e38200202908c17b43',
};

export { MULTICALL2_ADDRESSES, PYTH_ADDRESSES };
