import { TradeType } from '@uniswap/sdk-core';

import { QuoteIntent } from '../../constants/enum';
import { DEFAULT_SWAP_SLIPPAGE } from '../../constants/misc';
import {
  ClassicQuoteData,
  GetQuoteArgs,
  KatanaTrade,
  KatanaTradeRoutes,
  QuoteQueryParams,
  SwapFeeInfo,
} from '../../types';
import { computeRoutes } from './compute-routes';
import { getSwapFee } from './get-swap-fee';

const getClassicTradeDetails = (
  args: GetQuoteArgs,
  data: ClassicQuoteData,
): {
  gasUseEstimate: number | undefined;
  gasUseEstimateUSD: number | undefined;
  blockNumber: string | undefined;
  routes: KatanaTradeRoutes;
  swapFee: SwapFeeInfo | undefined;
} => {
  return {
    gasUseEstimate: data.gasUseEstimate ? parseFloat(data.gasUseEstimate) : undefined,
    gasUseEstimateUSD: data.gasUseEstimateUSD ? parseFloat(data.gasUseEstimateUSD) : undefined,
    blockNumber: data.blockNumber,
    routes: computeRoutes(args, data.route),
    swapFee: getSwapFee(data),
  };
};

const transformQuoteToTrade = (args: GetQuoteArgs, data: ClassicQuoteData): KatanaTrade => {
  const { tradeType } = args;
  const { gasUseEstimateUSD, blockNumber, routes, gasUseEstimate, swapFee } = getClassicTradeDetails(args, data);

  const classicTrade = new KatanaTrade({
    v2Routes: routes.v2Routes,
    v3Routes: routes.v3Routes,
    mixedRoutes: routes.mixedRoutes,
    tradeType,
    gasUseEstimateUSD,
    gasUseEstimate,
    blockNumber,
    requestId: '',
    swapFee,
  });

  return classicTrade;
};

const isTradeTypeExactInput = (tradeType: TradeType): boolean => {
  return tradeType === TradeType.EXACT_INPUT;
};

const getQuoteQueryParams = ({
  chainId,
  tradeType,
  intent = QuoteIntent.Quote,
  ...restProps
}: GetQuoteArgs): QuoteQueryParams => {
  const requestBody: QuoteQueryParams = {
    tokenInChainId: chainId,
    tokenOutChainId: chainId,
    type: isTradeTypeExactInput(tradeType) ? 'exactIn' : 'exactOut',
    intent,
    enableUniversalRouter: true,
    enableFeeOnTransferFeeFetching: true,
    protocols: ['v2', 'v3', 'mixed'],
    slippageTolerance: DEFAULT_SWAP_SLIPPAGE.toSignificant(),
    ...restProps,
  };
  return requestBody;
};

export { getQuoteQueryParams, transformQuoteToTrade };
