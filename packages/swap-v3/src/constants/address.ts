import { ChainId } from 'configs/chain';

type AddressMap = Record<ChainId, string>;

const MULTICALL2_ADDRESSES: AddressMap = {
  [ChainId.testnet]: '0x31c9ef8a631e2489e69833df3b2cb4bf0dc413bc',
  [ChainId.mainnet]: '0xc76d0d0d3aa608190f78db02bf2f5aef374fc0b9',
};

export { MULTICALL2_ADDRESSES };
