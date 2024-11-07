import { KatanaTrade } from 'types/katana-trade';
import { GetQuoteArgs } from 'types/routing-api';

import { getQuote } from './get-quote';

/**
 * Get best trade using routing API
 * @param chainId - Chain ID
 * @param tokenInAddress - Token in address
 * @param tokenOutAddress - Token out address
 * @param amount - Amount to swap
 * @param tradeType - Trade type
 * @param portionBips - Portion bips (Optional)
 * @param portionRecipient - Portion recipient (Optional)
 * @param recipient - Recipient (Optional)
 * @returns Object Trade | null if no route is found
 */
const getBestTrade = (args: GetQuoteArgs): Promise<KatanaTrade | null> => {
  return getQuote(args);
};

export { getBestTrade };
