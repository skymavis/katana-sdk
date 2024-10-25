import { CustomPair } from '@sky-mavis/katana-core';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { PoolType } from '@uniswap/universal-router-sdk';
import { Pair } from '@uniswap/v2-sdk';
import { FeeAmount, Pool } from '@uniswap/v3-sdk';
import { BigNumber } from 'ethers';
import { TokenInRoute, V2PoolInRoute, V3PoolInRoute } from 'types/routing-api';

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
  return new CustomPair(
    CurrencyAmount.fromRawAmount(parseTokenFromRouteQuote(reserve0.token), reserve0.quotient),
    CurrencyAmount.fromRawAmount(parseTokenFromRouteQuote(reserve1.token), reserve1.quotient),
  );
};

const parsePoolOrPair = (pool: V3PoolInRoute | V2PoolInRoute): Pool | Pair => {
  return pool.type === PoolType.V3Pool ? parsePool(pool) : parsePair(pool);
};

export { parsePair, parsePool, parsePoolOrPair, parseTokenFromRouteQuote };
