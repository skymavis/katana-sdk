import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import { InsufficientInputAmountError, InsufficientReservesError, Pair } from '@uniswap/v2-sdk';
import JSBI from 'jsbi';
import invariant from 'tiny-invariant';

import { BigInt_0, BigInt_1, BigInt_997, BigInt_1000 } from '../configs/misc';
import { computePairAddress } from '../utils';

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

/**
 * This is a clone Pair class from "@uniswap/v2-sdk" (https://github.com/Uniswap/sdks/blob/main/sdks/v2-sdk/src/entities/pair.ts)
 * with custom factoryAddress & initCodeHash for Ronin chain
 */
export class CustomPair extends Pair {
  public static getAddress(tokenA: Token, tokenB: Token): string {
    return computePairAddress({ chainId: tokenA.chainId, tokenA, tokenB });
  }

  public constructor(currencyAmountA: CurrencyAmount<Token>, tokenAmountB: CurrencyAmount<Token>) {
    super(currencyAmountA, tokenAmountB);
    const mutableThis = this as Mutable<Pair>;
    const tokenAmounts = currencyAmountA.currency.sortsBefore(tokenAmountB.currency) // does safety checks
      ? [currencyAmountA, tokenAmountB]
      : [tokenAmountB, currencyAmountA];

    const name = ['ERC20', ' / ', 'ERC20'];
    const symbol = ['ERC20', '/', 'ERC20'];

    tokenAmounts[0].currency.name;
    tokenAmounts[1].currency.name;
    if (tokenAmounts[0].currency.name) {
      name[0] = tokenAmounts[0].currency.name;
    }

    if (tokenAmounts[1].currency.name) {
      name[2] = tokenAmounts[1].currency.name;
    }

    if (tokenAmounts[0].currency.symbol) {
      symbol[0] = tokenAmounts[0].currency.symbol;
    }

    if (tokenAmounts[1].currency.symbol) {
      symbol[2] = tokenAmounts[1].currency.symbol;
    }
    mutableThis.liquidityToken = new Token(
      tokenAmounts[0].currency.chainId,
      CustomPair.getAddress(tokenAmounts[0].currency, tokenAmounts[1].currency),
      18,
      symbol.join(''),
      name.join(''),
    );
  }

  public getOutputAmount(
    inputAmount: CurrencyAmount<Token>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _calculateFotFees?: boolean,
  ): [CurrencyAmount<Token>, Pair] {
    invariant(this.involvesToken(inputAmount.currency), 'TOKEN');
    if (JSBI.equal(this.reserve0.quotient, BigInt_0) || JSBI.equal(this.reserve1.quotient, BigInt_0)) {
      throw new InsufficientReservesError();
    }
    const inputReserve = this.reserveOf(inputAmount.currency);
    const outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
    const inputAmountWithFee = JSBI.multiply(inputAmount.quotient, BigInt_997);
    const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.quotient);
    const denominator = JSBI.add(JSBI.multiply(inputReserve.quotient, BigInt_1000), inputAmountWithFee);
    const outputAmount = CurrencyAmount.fromRawAmount(
      inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      JSBI.divide(numerator, denominator),
    );
    if (JSBI.equal(outputAmount.quotient, BigInt_0)) {
      throw new InsufficientInputAmountError();
    }
    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  }

  public getInputAmount(
    outputAmount: CurrencyAmount<Token>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _calculateFotFees?: boolean,
  ): [CurrencyAmount<Token>, Pair] {
    invariant(this.involvesToken(outputAmount.currency), 'TOKEN');
    if (
      JSBI.equal(this.reserve0.quotient, BigInt_0) ||
      JSBI.equal(this.reserve1.quotient, BigInt_0) ||
      JSBI.greaterThanOrEqual(outputAmount.quotient, this.reserveOf(outputAmount.currency).quotient)
    ) {
      throw new InsufficientReservesError();
    }

    const outputReserve = this.reserveOf(outputAmount.currency);
    const inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
    const numerator = JSBI.multiply(JSBI.multiply(inputReserve.quotient, outputAmount.quotient), BigInt_1000);
    const denominator = JSBI.multiply(JSBI.subtract(outputReserve.quotient, outputAmount.quotient), BigInt_997);
    const inputAmount = CurrencyAmount.fromRawAmount(
      outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      JSBI.add(JSBI.divide(numerator, denominator), BigInt_1),
    );
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  }
}
