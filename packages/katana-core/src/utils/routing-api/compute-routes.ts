import { MixedRouteSDK } from '@uniswap/router-sdk';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { PoolType } from '@uniswap/universal-router-sdk';
import { Route as V2Route } from '@uniswap/v2-sdk';
import { Route as V3Route } from '@uniswap/v3-sdk';
import { SwapRouterNativeAssets } from 'constants/enum';
import { DEFAULT_ERC20_DECIMALS } from 'constants/tokens';
import { RON } from 'constants/tokens/ron';
import { KatanaTradeRoutes } from 'types/katana-trade';
import { ClassicQuoteData, GetQuoteArgs, RouteResult, V2PoolInRoute, V3PoolInRoute } from 'types/routing-api';

import { parsePair, parsePool, parsePoolOrPair, parseTokenFromRouteQuote } from './parser';

const isVersionedRoute = <T extends V2PoolInRoute | V3PoolInRoute>(
  type: T['type'],
  route: (V3PoolInRoute | V2PoolInRoute)[],
): route is T[] => {
  return route.every(pool => pool.type === type);
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

/**
 * Transforms a Routing API quote into an array of routes that can be used to
 * create a `Trade`.
 */
const parseRoutes = (args: GetQuoteArgs, routes: ClassicQuoteData['route']): RouteResult[] | undefined => {
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

const constructKatanaTradeRoutes = (routes: RouteResult[] | undefined): KatanaTradeRoutes => {
  const validRoutes: KatanaTradeRoutes = {
    v2Routes: [],
    v3Routes: [],
    mixedRoutes: [],
  };

  routes?.map(({ inputAmount, outputAmount, mixedRoute, routev2, routev3 }) => {
    if (!!routev2) {
      validRoutes.v2Routes.push({ inputAmount, outputAmount, routev2 });
    }
    if (!!routev3) {
      validRoutes.v3Routes.push({ inputAmount, outputAmount, routev3 });
    }
    if (!!mixedRoute) {
      validRoutes.mixedRoutes.push({ inputAmount, outputAmount, mixedRoute });
    }
  });

  return validRoutes;
};

const computeRoutes = (args: GetQuoteArgs, routes: ClassicQuoteData['route']) => {
  const parsedRoutes = parseRoutes(args, routes);
  return constructKatanaTradeRoutes(parsedRoutes);
};

export { computeRoutes };
