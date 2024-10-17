import { BigNumber } from '@ethersproject/bignumber';
import { Currency } from '@uniswap/sdk-core';

// Cost for crossing an uninitialized tick.
export const COST_PER_UNINIT_TICK = BigNumber.from(0);

export const BASE_SWAP_COST = BigNumber.from(2000);

export const COST_PER_INIT_TICK = BigNumber.from(31000);

export const COST_PER_HOP = BigNumber.from(80000);

export const SINGLE_HOP_OVERHEAD = BigNumber.from(15000);

export const TOKEN_OVERHEAD = BigNumber.from(0);

export const NATIVE_WRAP_OVERHEAD = BigNumber.from(27938);

export const NATIVE_UNWRAP_OVERHEAD = BigNumber.from(36000);

export const NATIVE_OVERHEAD = (amount: Currency, quote: Currency): BigNumber => {
  if (amount.isNative) {
    // need to wrap eth in
    return NATIVE_WRAP_OVERHEAD;
  }
  if (quote.isNative) {
    // need to unwrap eth out
    return NATIVE_UNWRAP_OVERHEAD;
  }
  return BigNumber.from(0);
};
