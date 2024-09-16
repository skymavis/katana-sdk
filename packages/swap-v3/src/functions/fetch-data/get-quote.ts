import axios from 'axios';
import { DEFAULT_SWAP_SLIPPAGE } from 'constants/misc';
import { KATANA_ROUTING_API_URL } from 'constants/url';
import { ClassicQuoteData, GetQuoteArgs, QuoteQueryParams, TradeResult } from 'types/routing-api';
import { isTradeTypeExactInput, QuoteState, transformQuoteToTrade } from 'utils/routing-api';

enum QuoteIntent {
  Pricing = 'pricing',
  Quote = 'quote',
}

/**
 * Get quote from routing API
 * @param chainId - Chain ID
 * @param intent - Intent of the quote (Default is QuoteIntent.Quote)
 * @param amount - Amount to swap
 * @param tokenInAddress - Token in address
 * @param tokenOutAddress - Token out address
 * @param tradeType - Trade type
 * @param portionBips - Portion bips (Optional)
 * @param portionRecipient - Portion recipient (Optional)
 * @param recipient - Recipient (Optional)
 * @returns Object TradeResult with state and trade
 */
const getQuote = async (args: GetQuoteArgs): Promise<TradeResult> => {
  const { chainId, intent = QuoteIntent.Quote, ...restProps } = args;
  try {
    if (!chainId) {
      throw new Error('chainId is required');
    }

    const requestBody: QuoteQueryParams = {
      tokenInChainId: chainId,
      tokenOutChainId: chainId,
      intent,
      type: isTradeTypeExactInput(args.tradeType) ? 'exactIn' : 'exactOut',
      enableUniversalRouter: true,
      enableFeeOnTransferFeeFetching: true,
      protocols: ['v2', 'v3', 'mixed'],
      slippageTolerance: DEFAULT_SWAP_SLIPPAGE.toSignificant(),
      ...restProps,
    };

    const response = await axios.get(
      `${KATANA_ROUTING_API_URL}/quote?${new URLSearchParams(Object.entries(requestBody as any)).toString()}`,
    );

    const classicQuoteResponse = response.data as ClassicQuoteData;
    const tradeResult = transformQuoteToTrade(args, classicQuoteResponse);
    return { ...tradeResult };
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
        return {
          state: QuoteState.NOT_FOUND,
          trade: undefined,
        };
      }
    }
    console.error(`GetQuote failed on Routing API: ${error?.message ?? error?.detail ?? error}`);
    throw error;
  }
};

export { getQuote, QuoteIntent, QuoteState };
