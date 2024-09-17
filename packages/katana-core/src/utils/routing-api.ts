import { Currency, CurrencyAmount, Percent, Token, TradeType } from '@axieinfinity/sdk-core';
import { MixedRouteSDK } from '@uniswap/router-sdk';
import { Pair, Route as V2Route } from '@uniswap/v2-sdk';
import { FeeAmount, Pool, Route as V3Route } from '@uniswap/v3-sdk';
import { BIPS_BASE } from 'constants/misc';
import { DEFAULT_ERC20_DECIMALS } from 'constants/tokens';
import { RON } from 'constants/tokens/ron';
import { BigNumber } from 'ethers';
import { KatanaTrade } from 'types/katana-trade';
import {
  ClassicQuoteData,
  GetQuoteArgs,
  RouteResult,
  SwapFeeInfo,
  TokenInRoute,
  TradeResult,
  V2PoolInRoute,
  V3PoolInRoute,
} from 'types/routing-api';

enum PoolType {
  V2Pool = 'v2-pool',
  V3Pool = 'v3-pool',
}

enum SwapRouterNativeAssets {
  RON = 'RON',
}

enum QuoteState {
  SUCCESS = 'Success',
  NOT_FOUND = 'Not found',
}

const isVersionedRoute = <T extends V2PoolInRoute | V3PoolInRoute>(
  type: T['type'],
  route: (V3PoolInRoute | V2PoolInRoute)[],
): route is T[] => {
  return route.every(pool => pool.type === type);
};

const isTradeTypeExactInput = (tradeType: TradeType): boolean => {
  return tradeType === TradeType.EXACT_INPUT;
};

const parseTokenFromRouteQuote = ({
  address,
  chainId,
  decimals,
  symbol,
  buyFeeBps,
  sellFeeBps,
}: TokenInRoute): Token => {
  const buyFeeBpsBN = buyFeeBps ? BigNumber.from(buyFeeBps) : undefined;
  const sellFeeBpsBN = sellFeeBps ? BigNumber.from(sellFeeBps) : undefined;
  return new Token(
    chainId,
    address,
    parseInt(decimals.toString()),
    symbol,
    undefined,
    false,
    buyFeeBpsBN,
    sellFeeBpsBN,
  );
};

const parsePool = ({ fee, sqrtRatioX96, liquidity, tickCurrent, tokenIn, tokenOut }: V3PoolInRoute): Pool => {
  return new Pool(
    parseTokenFromRouteQuote(tokenIn),
    parseTokenFromRouteQuote(tokenOut),
    parseInt(fee) as FeeAmount,
    sqrtRatioX96,
    liquidity,
    parseInt(tickCurrent),
  );
};

const parsePair = ({ reserve0, reserve1 }: V2PoolInRoute): Pair => {
  return new Pair(
    CurrencyAmount.fromRawAmount(parseTokenFromRouteQuote(reserve0.token), reserve0.quotient),
    CurrencyAmount.fromRawAmount(parseTokenFromRouteQuote(reserve1.token), reserve1.quotient),
  );
};

const parsePoolOrPair = (pool: V3PoolInRoute | V2PoolInRoute): Pool | Pair => {
  return pool.type === PoolType.V3Pool ? parsePool(pool) : parsePair(pool);
};

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

/**
 * Transforms a Routing API quote into an array of routes that can be used to
 * create a `Trade`.
 */
const computeRoutes = (args: GetQuoteArgs, routes: ClassicQuoteData['route']): RouteResult[] | undefined => {
  if (routes.length === 0) {
    return [];
  }
  const [currencyIn, currencyOut] = getTradeCurrencies(args, routes);

  try {
    return routes.map(route => {
      if (route.length === 0) {
        throw new Error('Expected route to have at least one pair or pool');
      }
      const rawAmountIn = route[0].amountIn;
      const rawAmountOut = route[route.length - 1].amountOut;

      if (!rawAmountIn || !rawAmountOut) {
        throw new Error('Expected both amountIn and amountOut to be present');
      }

      const isOnlyV2 = isVersionedRoute<V2PoolInRoute>(PoolType.V2Pool, route);
      const isOnlyV3 = isVersionedRoute<V3PoolInRoute>(PoolType.V3Pool, route);

      return {
        routev3: isOnlyV3 ? new V3Route(route.map(parsePool), currencyIn, currencyOut) : null,
        routev2: isOnlyV2 ? new V2Route(route.map(parsePair), currencyIn, currencyOut) : null,
        mixedRoute:
          !isOnlyV3 && !isOnlyV2 ? new MixedRouteSDK(route.map(parsePoolOrPair), currencyIn, currencyOut) : null,
        inputAmount: CurrencyAmount.fromRawAmount(currencyIn, rawAmountIn),
        outputAmount: CurrencyAmount.fromRawAmount(currencyOut, rawAmountOut),
      };
    });
  } catch (e) {
    console.error('Error computing routes', e);
    return;
  }
};

// Prepares the currencies used for the actual Swap on Universal Router
// May not match `currencyIn` that the user selected because for RON inputs in KatanaSwap, the actual
// swap will use WRON.
const getTradeCurrencies = (args: GetQuoteArgs, routes?: ClassicQuoteData['route']): [Currency, Currency] => {
  const { tokenInAddress, tokenOutAddress, chainId } = args;

  const tokenInIsNative = Object.values(SwapRouterNativeAssets).includes(tokenInAddress as SwapRouterNativeAssets);
  const tokenOutIsNative = Object.values(SwapRouterNativeAssets).includes(tokenOutAddress as SwapRouterNativeAssets);

  const serializedTokenIn = routes?.[0]?.[0]?.tokenIn;
  const serializedTokenOut = routes?.[0]?.[routes[0]?.length - 1]?.tokenOut;

  const currencyIn = tokenInIsNative
    ? RON.onChain(chainId)
    : parseTokenFromRouteQuote({
        address: tokenInAddress,
        chainId: chainId,
        decimals: serializedTokenIn?.decimals || DEFAULT_ERC20_DECIMALS,
        symbol: serializedTokenIn?.symbol,
        buyFeeBps: serializedTokenIn?.buyFeeBps,
        sellFeeBps: serializedTokenIn?.sellFeeBps,
      });
  const currencyOut = tokenOutIsNative
    ? RON.onChain(chainId)
    : parseTokenFromRouteQuote({
        address: tokenOutAddress,
        chainId: chainId,
        decimals: serializedTokenOut?.decimals || DEFAULT_ERC20_DECIMALS,
        symbol: serializedTokenOut?.symbol,
        buyFeeBps: serializedTokenOut?.buyFeeBps,
        sellFeeBps: serializedTokenOut?.sellFeeBps,
      });

  return [currencyIn, currencyOut];
};

const getClassicTradeDetails = (
  args: GetQuoteArgs,
  data: ClassicQuoteData,
): {
  gasUseEstimate?: number;
  gasUseEstimateUSD?: number;
  blockNumber?: string;
  routes?: RouteResult[];
  swapFee?: SwapFeeInfo;
} => {
  const classicQuote = data;

  if (!classicQuote) {
    return {};
  }

  return {
    gasUseEstimate: classicQuote.gasUseEstimate ? parseFloat(classicQuote.gasUseEstimate) : undefined,
    gasUseEstimateUSD: classicQuote.gasUseEstimateUSD ? parseFloat(classicQuote.gasUseEstimateUSD) : undefined,
    blockNumber: classicQuote.blockNumber,
    routes: computeRoutes(args, classicQuote.route),
    swapFee: getSwapFee(classicQuote),
  };
};

const transformQuoteToTrade = (args: GetQuoteArgs, data: ClassicQuoteData): TradeResult => {
  const { tradeType } = args;
  const { gasUseEstimateUSD, blockNumber, routes, gasUseEstimate, swapFee } = getClassicTradeDetails(args, data);

  const classicTrade = new KatanaTrade({
    v2Routes:
      routes
        ?.filter(
          (
            r,
          ): r is RouteResult & {
            routev2: NonNullable<RouteResult['routev2']>;
          } => r.routev2 !== null,
        )
        .map(({ routev2, inputAmount, outputAmount }) => ({
          routev2,
          inputAmount,
          outputAmount,
        })) ?? [],
    v3Routes:
      routes
        ?.filter(
          (
            r,
          ): r is RouteResult & {
            routev3: NonNullable<RouteResult['routev3']>;
          } => r.routev3 !== null,
        )
        .map(({ routev3, inputAmount, outputAmount }) => ({
          routev3,
          inputAmount,
          outputAmount,
        })) ?? [],
    mixedRoutes:
      routes
        ?.filter(
          (
            r,
          ): r is RouteResult & {
            mixedRoute: NonNullable<RouteResult['mixedRoute']>;
          } => r.mixedRoute !== null,
        )
        .map(({ mixedRoute, inputAmount, outputAmount }) => ({
          mixedRoute,
          inputAmount,
          outputAmount,
        })) ?? [],
    tradeType,
    gasUseEstimateUSD,
    gasUseEstimate,
    blockNumber,
    requestId: '',
    swapFee,
  });

  return { state: QuoteState.SUCCESS, trade: classicTrade };
};

export { isTradeTypeExactInput, QuoteState, transformQuoteToTrade };
