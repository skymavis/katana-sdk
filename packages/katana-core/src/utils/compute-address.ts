import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import { Token } from '@uniswap/sdk-core';
import { computePoolAddress as computePoolAddressV3SDK, FeeAmount } from '@uniswap/v3-sdk';

import {
  ChainId,
  KATANA_V2_INIT_CODE_HASH,
  KATANA_V3_INIT_CODE_HASH,
  V2_FACTORY_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
} from '../configs';

const computePairAddress = ({
  chainId,
  tokenA,
  tokenB,
}: {
  chainId: ChainId;
  tokenA: Token;
  tokenB: Token;
}): string => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
  return getCreate2Address(
    V2_FACTORY_ADDRESSES[chainId],
    keccak256(['bytes'], [pack(['address', 'address'], [token0.address, token1.address])]),
    KATANA_V2_INIT_CODE_HASH[chainId],
  );
};

const computePoolAddress = ({
  chainId,
  tokenA,
  tokenB,
  fee,
}: {
  chainId: ChainId;
  tokenA: Token;
  tokenB: Token;
  fee: FeeAmount;
}) => {
  return computePoolAddressV3SDK({
    factoryAddress: V3_CORE_FACTORY_ADDRESSES[chainId],
    tokenA,
    tokenB,
    fee,
    initCodeHashManualOverride: KATANA_V3_INIT_CODE_HASH[chainId],
  });
};

export { computePairAddress, computePoolAddress };
