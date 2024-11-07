import { ChainId, RON } from '@sky-mavis/katana-core';
import { Currency, Price, Token, TradeType } from '@uniswap/sdk-core';

import { QuoteIntent, SwapRouterNativeAssets } from '../../../constants/enum';
import { RON_AMOUNT_OUT, STABLECOIN_AMOUNT_OUT } from '../../../constants/price';
import { getQuote } from './get-quote';

type GetUSDCPriceArgs = {
  chainId: ChainId;
  tokenAddress: string;
};

/**
 * Get the price in USDC of the input token address,
 * which will find best trade exact out from the input token to 10_000 USDC token
 * @param chainId - Chain ID
 * @param tokenAddress - Token address
 * @returns Object Price | null if no route is found
 */
const getUSDCPrice = async ({ chainId, tokenAddress }: GetUSDCPriceArgs): Promise<Price<Currency, Token> | null> => {
  const amountOut = STABLECOIN_AMOUNT_OUT[chainId];
  const stablecoin = amountOut.currency;

  if (tokenAddress.toLowerCase() === stablecoin.address.toLowerCase()) {
    return new Price(stablecoin, stablecoin, '1', '1');
  }

  const trade = await getQuote({
    chainId,
    tokenInAddress: tokenAddress,
    tokenOutAddress: stablecoin.address,
    tradeType: TradeType.EXACT_OUTPUT,
    amount: amountOut.quotient.toString(),
    intent: QuoteIntent.Pricing,
  });

  if (!trade) {
    return null;
  }

  const { numerator, denominator } = trade.routes[0].midPrice;
  return new Price(trade.inputAmount.currency, stablecoin, denominator, numerator);
};

type GetRONPriceArgs = GetUSDCPriceArgs;

/**
 * Get the price in RON of the input token address,
 * which will find best trade exact out from the input token to 3_000 RON
 * @param chainId - Chain ID
 * @param tokenAddress - Token address
 * @returns Object Price | null if no route is found
 */
const getRONPrice = async ({ chainId, tokenAddress }: GetRONPriceArgs): Promise<Price<Currency, RON> | null> => {
  const amountOut = RON_AMOUNT_OUT[chainId];

  const trade = await getQuote({
    chainId,
    tokenInAddress: tokenAddress,
    tokenOutAddress: SwapRouterNativeAssets.RON,
    tradeType: TradeType.EXACT_OUTPUT,
    amount: amountOut.quotient.toString(),
    intent: QuoteIntent.Pricing,
  });

  if (!trade) {
    return null;
  }

  const { numerator, denominator } = trade.routes[0].midPrice;
  return new Price(trade.inputAmount.currency, RON.onChain(chainId), denominator, numerator);
};

type GetTokenPriceArgs = GetUSDCPriceArgs;

/**
 * Get the price of the input token address based on the best trade route exact out to RON or USDC
 * NOTE: RON price is prioritized over USDC price
 * @param chainId - Chain ID
 * @param tokenAddress - Token address
 * @returns Object Price | null if no route is found
 */
const getTokenPrice = async ({
  chainId,
  tokenAddress,
}: GetTokenPriceArgs): Promise<Price<Currency, Token | RON> | null> => {
  const tokenRONPrice = await getRONPrice({ chainId, tokenAddress });
  if (tokenRONPrice) {
    return tokenRONPrice;
  }

  const tokenUSDCPrice = await getUSDCPrice({ chainId, tokenAddress });
  return tokenUSDCPrice;
};

export { getTokenPrice };
