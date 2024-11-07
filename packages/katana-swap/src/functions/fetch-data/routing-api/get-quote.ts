import axios from 'axios';

import { KATANA_ROUTING_API_URL } from '../../../constants/url';
import { ClassicQuoteData, GetQuoteArgs, KatanaTrade } from '../../../types';
import { getQuoteQueryParams, transformQuoteToTrade } from '../../../utils/routing-api';

/**
 * Get quote from routing API
 * @param chainId - Chain ID
 * @param amount - Amount to swap
 * @param tokenInAddress - Token in address | SwapRouterNativeAssets
 * @param tokenOutAddress - Token out address | SwapRouterNativeAssets
 * @param tradeType - Trade type
 * @param intent - Intent of the quote
 * @param portionBips - Portion bips (Optional)
 * @param portionRecipient - Portion recipient (Optional)
 * @param recipient - Recipient (Optional)
 * @returns Object Trade | null if no route is found
 */
const getQuote = async (args: GetQuoteArgs): Promise<KatanaTrade | null> => {
  try {
    const requestBody = getQuoteQueryParams(args);
    const response = await axios.get(
      `${KATANA_ROUTING_API_URL}/quote?${new URLSearchParams(Object.entries(requestBody as any)).toString()}`,
    );

    const classicQuoteResponse = response.data as ClassicQuoteData;
    const tradeResult = transformQuoteToTrade(args, classicQuoteResponse);
    return tradeResult;
  } catch (error: any) {
    if (error.response) {
      // cast as any here because we do a runtime check on it being an object before indexing into .errorCode
      const errorData = error.response.data as {
        errorCode?: string;
        detail?: string;
      };
      // NO_ROUTE should be treated as a valid response to prevent retries.
      if (
        typeof errorData === 'object' &&
        (errorData?.errorCode === 'NO_ROUTE' || errorData?.detail === 'No quotes available')
      ) {
        return null;
      }
    }
    console.error(`GetQuote failed on Routing API: ${error?.message ?? error?.detail ?? error}`);
    throw error;
  }
};

export { getQuote };
