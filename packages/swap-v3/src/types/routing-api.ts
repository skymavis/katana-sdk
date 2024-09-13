import { ChainId, Currency, CurrencyAmount, Percent, Token, TradeType } from '@axieinfinity/sdk-core';
import { MixedRouteSDK } from '@uniswap/router-sdk';
import { Route as V2Route } from '@uniswap/v2-sdk';
import { Route as V3Route } from '@uniswap/v3-sdk';
import { QuoteIntent, QuoteState } from 'functions/fetch-data/get-quote';

import { ClassicTrade } from './classic-trade';

type TradeTypeParam = 'exactIn' | 'exactOut';

type GetQuoteArgs = {
  chainId: ChainId;
  tokenInAddress: string;
  tokenOutAddress: string;
  tradeType: TradeType;
  amount: string;
  intent?: QuoteIntent;
  portionBips?: QuoteQueryParams['portionBips'];
  portionRecipient?: QuoteQueryParams['portionRecipient'];
  recipient?: QuoteQueryParams['recipient'];
};

type QuoteQueryParams = {
  tokenInAddress: string;
  tokenInChainId: number;
  tokenOutAddress: string;
  tokenOutChainId: number;
  amount: string;
  type: TradeTypeParam;

  recipient?: string;

  protocols?: string[] | string;

  slippageTolerance?: string;
  deadline?: string;
  algorithm?: string;

  gasPriceWei?: string;
  minSplits?: number;
  forceCrossProtocol?: boolean;
  forceMixedRoutes?: boolean;
  simulateFromAddress?: string;
  permitSignature?: string;
  permitNonce?: string;
  permitExpiration?: string;
  permitAmount?: string;
  permitSigDeadline?: string;
  enableUniversalRouter?: boolean;
  quoteSpeed?: string;
  debugRoutingConfig?: string;
  unicornSecret?: string;
  intent?: string;
  enableFeeOnTransferFeeFetching?: boolean;
  portionBips?: number;
  portionAmount?: string;
  portionRecipient?: string;
  source?: string;
  gasToken?: string;
};

// from https://github.com/Uniswap/routing-api/blob/main/lib/handlers/schema.ts
type TokenInRoute = Pick<Token, 'address' | 'chainId' | 'symbol' | 'decimals'> & {
  buyFeeBps?: string;
  sellFeeBps?: string;
};

type V3PoolInRoute = {
  type: 'v3-pool';
  tokenIn: TokenInRoute;
  tokenOut: TokenInRoute;
  sqrtRatioX96: string;
  liquidity: string;
  tickCurrent: string;
  fee: string;
  amountIn?: string;
  amountOut?: string;

  // not used in the interface
  address?: string;
};

type V2Reserve = {
  token: TokenInRoute;
  quotient: string;
};

type V2PoolInRoute = {
  type: 'v2-pool';
  tokenIn: TokenInRoute;
  tokenOut: TokenInRoute;
  reserve0: V2Reserve;
  reserve1: V2Reserve;
  amountIn?: string;
  amountOut?: string;

  // not used in the interface
  // avoid returning it from the client-side smart-order-router
  address?: string;
};

// From `ClassicQuoteDataJSON` in https://github.com/Uniswap/unified-routing-api/blob/main/lib/entities/quote/ClassicQuote.ts
type ClassicQuoteData = {
  requestId?: string;
  quoteId?: string;
  blockNumber: string;
  amount: string;
  amountDecimals: string;
  gasPriceWei?: string;
  gasUseEstimate?: string;
  gasUseEstimateQuote?: string;
  gasUseEstimateQuoteDecimals?: string;
  gasUseEstimateUSD?: string;
  methodParameters?: { calldata: string; value: string };
  quote: string;
  quoteDecimals: string;
  quoteGasAdjusted: string;
  quoteGasAdjustedDecimals: string;
  route: Array<(V3PoolInRoute | V2PoolInRoute)[]>;
  routeString: string;
  portionBips?: number;
  portionRecipient?: string;
  portionAmount?: string;
  portionAmountDecimals?: string;
  quoteGasAndPortionAdjusted?: string;
  quoteGasAndPortionAdjustedDecimals?: string;
};

type SwapFeeInfo = { recipient: string; percent: Percent; amount: string /* raw amount of output token */ };

type TradeResult =
  | {
      state: QuoteState.NOT_FOUND;
      trade?: undefined;
    }
  | {
      state: QuoteState.SUCCESS;
      trade: ClassicTrade;
    };

type RouteResult = {
  routev3: V3Route<Currency, Currency> | null;
  routev2: V2Route<Currency, Currency> | null;
  mixedRoute: MixedRouteSDK<Currency, Currency> | null;
  inputAmount: CurrencyAmount<Currency>;
  outputAmount: CurrencyAmount<Currency>;
};

export type {
  ClassicQuoteData,
  GetQuoteArgs,
  QuoteQueryParams,
  RouteResult,
  SwapFeeInfo,
  TokenInRoute,
  TradeResult,
  V2PoolInRoute,
  V3PoolInRoute,
};
