import { Percent } from '@uniswap/sdk-core';
import { BIPS_BASE } from 'constants/misc';
import { ClassicQuoteData, SwapFeeInfo } from 'types/routing-api';

const getSwapFee = (data: ClassicQuoteData): SwapFeeInfo | undefined => {
  const { portionAmount, portionBips, portionRecipient } = data;

  if (!portionAmount || !portionBips || !portionRecipient) {
    return undefined;
  }

  return {
    recipient: portionRecipient,
    percent: new Percent(portionBips, BIPS_BASE),
    amount: portionAmount,
  };
};

export { getSwapFee };
