import { TradeType } from '@axieinfinity/sdk-core';
import { FlatFeeOptions } from '@uniswap/universal-router-sdk';
import { FeeOptions } from '@uniswap/v3-sdk';
import { BigNumber } from 'ethers';
import { KatanaTrade } from 'types/katana-trade';

type UniversalRouterFeeField = { fee: FeeOptions } | { flatFee: FlatFeeOptions };

const getUniversalRouterFeeFields = (trade: KatanaTrade): UniversalRouterFeeField | undefined => {
  if (!trade.swapFee) {
    return undefined;
  }

  if (trade.tradeType === TradeType.EXACT_INPUT) {
    return { fee: { fee: trade.swapFee.percent, recipient: trade.swapFee.recipient } };
  } else {
    return {
      flatFee: {
        amount: BigNumber.from(trade.swapFee.amount),
        recipient: trade.swapFee.recipient,
      },
    };
  }
};

const calculateGasMargin = (value: BigNumber): BigNumber => {
  return value.mul(2);
};

export { calculateGasMargin, getUniversalRouterFeeFields };
