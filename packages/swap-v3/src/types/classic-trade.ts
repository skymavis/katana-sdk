import { Currency, CurrencyAmount, TradeType } from '@axieinfinity/sdk-core';
import { MixedRouteSDK, Trade } from '@uniswap/router-sdk';
import { Price } from '@uniswap/sdk-core';
import { Route as V2Route } from '@uniswap/v2-sdk';
import { Route as V3Route } from '@uniswap/v3-sdk';

import { SwapFeeInfo } from './routing-api';

class ClassicTrade extends Trade<Currency, Currency, TradeType> {
  blockNumber: string | null | undefined;
  requestId: string | undefined;
  swapFee: SwapFeeInfo | undefined;
  gasUseEstimate?: number; // gas estimate for swaps
  gasUseEstimateUSD?: number; // gas estimate for swaps in USD

  constructor({
    blockNumber,
    requestId,
    swapFee,
    gasUseEstimate,
    gasUseEstimateUSD,
    ...routes
  }: {
    gasUseEstimate?: number;
    gasUseEstimateUSD?: number;
    totalGasUseEstimateUSD?: number;
    blockNumber?: string | null;
    requestId?: string;
    swapFee?: SwapFeeInfo;
    v2Routes: {
      routev2: V2Route<Currency, Currency>;
      inputAmount: CurrencyAmount<Currency>;
      outputAmount: CurrencyAmount<Currency>;
    }[];
    v3Routes: {
      routev3: V3Route<Currency, Currency>;
      inputAmount: CurrencyAmount<Currency>;
      outputAmount: CurrencyAmount<Currency>;
    }[];
    tradeType: TradeType;
    mixedRoutes?: {
      mixedRoute: MixedRouteSDK<Currency, Currency>;
      inputAmount: CurrencyAmount<Currency>;
      outputAmount: CurrencyAmount<Currency>;
    }[];
  }) {
    super(routes);
    this.blockNumber = blockNumber;
    this.requestId = requestId;
    this.swapFee = swapFee;
    this.gasUseEstimate = gasUseEstimate;
    this.gasUseEstimate = gasUseEstimateUSD;
  }

  public get executionPrice(): Price<Currency, Currency> {
    if (this.tradeType === TradeType.EXACT_INPUT || !this.swapFee) {
      return super.executionPrice;
    }

    // Fix inaccurate price calculation for exact output trades
    return new Price({ baseAmount: this.inputAmount, quoteAmount: this.postSwapFeeOutputAmount });
  }

  public get postSwapFeeOutputAmount(): CurrencyAmount<Currency> {
    // Routing api already applies the swap fee to the output amount for exact-in
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return this.outputAmount;
    }

    const swapFeeAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, this.swapFee?.amount ?? 0);
    return this.outputAmount.subtract(swapFeeAmount);
  }
}

export { ClassicTrade };
