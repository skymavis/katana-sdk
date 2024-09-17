import { Currency, NativeCurrency, Token } from '@axieinfinity/sdk-core';
import { ChainId } from 'configs/chain';
import invariant from 'tiny-invariant';

import { DEFAULT_ERC20 } from '.';

/**
 * RON is the main usage of a 'native' currency, i.e. for Ronin mainnet and testnet.
 */
export class RON extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'RON', 'Ronin');
  }

  public get wrapped(): Token {
    const weth9 = DEFAULT_ERC20[this.chainId as ChainId].WRON;
    invariant(!!weth9, 'WRAPPED');
    return weth9;
  }

  private static _etherCache: { [chainId: number]: RON } = {};

  public static onChain(chainId: number): RON {
    return this._etherCache[chainId] ?? (this._etherCache[chainId] = new RON(chainId));
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }
}
