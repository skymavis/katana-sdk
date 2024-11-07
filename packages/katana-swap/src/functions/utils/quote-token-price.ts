import { RON } from '@sky-mavis/katana-core';
import { Currency, Price, Token } from '@uniswap/sdk-core';

import tryParseCurrencyAmount from '../../utils/try-parse-currency-amount';

type QuoteTokenPriceArgs = {
  tokenPrice: Price<Currency, Token | RON> | null;
  ronPriceUSDFromPyth: number;
  amount: string;
};

const quoteTokenPrice = ({ tokenPrice, ronPriceUSDFromPyth, amount }: QuoteTokenPriceArgs): number | null => {
  if (!tokenPrice) {
    return null;
  }

  const currencyAmount = tryParseCurrencyAmount(amount, tokenPrice.baseCurrency);
  if (!currencyAmount) {
    return null;
  }

  let result: number | null = null;
  if (tokenPrice.quoteCurrency.isNative) {
    result = parseFloat(tokenPrice.quote(currencyAmount).toExact()) * ronPriceUSDFromPyth;
  }

  result = parseFloat(tokenPrice.quote(currencyAmount).toExact());
  return result;
};

export { quoteTokenPrice };
