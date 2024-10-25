import { Percent } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

const BigInt_0 = JSBI.BigInt(0);
const BigInt_1 = JSBI.BigInt(1);
const BigInt_5 = JSBI.BigInt(5);
const BigInt_997 = JSBI.BigInt(997);
const BigInt_1000 = JSBI.BigInt(1000);

const BASIS_POINTS = JSBI.BigInt(10000);

const ZERO_PERCENT = new Percent(BigInt_0);
const ONE_HUNDRED_PERCENT = new Percent(BigInt_1);
const MINIMUM_LIQUIDITY = JSBI.BigInt(1000);

export {
  BASIS_POINTS,
  BigInt_0,
  BigInt_1,
  BigInt_5,
  BigInt_997,
  BigInt_1000,
  MINIMUM_LIQUIDITY,
  ONE_HUNDRED_PERCENT,
  ZERO_PERCENT,
};
