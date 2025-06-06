import { ChainId } from '@sky-mavis/katana-core';
import { Token } from '@uniswap/sdk-core';
import _ from 'lodash';

import { log, WRAPPED_NATIVE_CURRENCY } from '../util';
import { ICache } from './cache';
import { ITokenProvider, TokenAccessor } from './token-provider';
import { USDC_RONIN_MAINNET, USDC_RONIN_TESTNET } from '../routers/alpha-router/gas-models/gas-model';
// These tokens will added to the Token cache on initialization.
export const CACHE_SEED_TOKENS: {
  [chainId in ChainId]?: { [symbol: string]: Token };
} = {
  [ChainId.mainnet]: {
    WRON: WRAPPED_NATIVE_CURRENCY[ChainId.mainnet],
    USDC: USDC_RONIN_MAINNET,
  },
  [ChainId.testnet]: {
    WRON: WRAPPED_NATIVE_CURRENCY[ChainId.testnet],
    USDC: USDC_RONIN_TESTNET,
  },
};

/**
 * Provider for getting token metadata that falls back to a different provider
 * in the event of failure.
 *
 * @export
 * @class CachingTokenProviderWithFallback
 */
export class CachingTokenProviderWithFallback implements ITokenProvider {
  private CACHE_KEY = (chainId: ChainId, address: string) => `token-${chainId}-${address}`;

  constructor(
    protected chainId: ChainId,
    // Token metadata (e.g. symbol and decimals) don't change so can be cached indefinitely.
    // Constructing a new token object is slow as sdk-core does checksumming.
    private tokenCache: ICache<Token>,
    protected primaryTokenProvider: ITokenProvider,
    protected fallbackTokenProvider?: ITokenProvider,
  ) {}

  public async getTokens(_addresses: string[]): Promise<TokenAccessor> {
    const seedTokens = CACHE_SEED_TOKENS[this.chainId];

    if (seedTokens) {
      for (const token of Object.values(seedTokens)) {
        await this.tokenCache.set(this.CACHE_KEY(this.chainId, token.address.toLowerCase()), token);
      }
    }

    const addressToToken: { [address: string]: Token } = {};
    const symbolToToken: { [symbol: string]: Token } = {};

    const addresses = _(_addresses)
      .map(address => address.toLowerCase())
      .uniq()
      .value();

    const addressesToFindInPrimary = [];
    const addressesToFindInSecondary = [];

    for (const address of addresses) {
      if (await this.tokenCache.has(this.CACHE_KEY(this.chainId, address))) {
        addressToToken[address.toLowerCase()] = (await this.tokenCache.get(this.CACHE_KEY(this.chainId, address)))!;
        symbolToToken[addressToToken[address]!.symbol!] = (await this.tokenCache.get(
          this.CACHE_KEY(this.chainId, address),
        ))!;
      } else {
        addressesToFindInPrimary.push(address);
      }
    }

    log.info(
      { addressesToFindInPrimary },
      `Found ${addresses.length - addressesToFindInPrimary.length} out of ${addresses.length} tokens in local cache. ${
        addressesToFindInPrimary.length > 0
          ? `Checking primary token provider for ${addressesToFindInPrimary.length} tokens`
          : ``
      }
      `,
    );

    if (addressesToFindInPrimary.length > 0) {
      const primaryTokenAccessor = await this.primaryTokenProvider.getTokens(addressesToFindInPrimary);

      for (const address of addressesToFindInPrimary) {
        const token = primaryTokenAccessor.getTokenByAddress(address);

        if (token) {
          addressToToken[address.toLowerCase()] = token;
          symbolToToken[addressToToken[address]!.symbol!] = token;
          await this.tokenCache.set(this.CACHE_KEY(this.chainId, address.toLowerCase()), addressToToken[address]!);
        } else {
          addressesToFindInSecondary.push(address);
        }
      }

      log.info(
        { addressesToFindInSecondary },
        `Found ${addressesToFindInPrimary.length - addressesToFindInSecondary.length} tokens in primary. ${
          this.fallbackTokenProvider
            ? `Checking secondary token provider for ${addressesToFindInSecondary.length} tokens`
            : `No fallback token provider specified. About to return.`
        }`,
      );
    }

    if (this.fallbackTokenProvider && addressesToFindInSecondary.length > 0) {
      const secondaryTokenAccessor = await this.fallbackTokenProvider.getTokens(addressesToFindInSecondary);

      for (const address of addressesToFindInSecondary) {
        const token = secondaryTokenAccessor.getTokenByAddress(address);
        if (token) {
          addressToToken[address.toLowerCase()] = token;
          symbolToToken[addressToToken[address]!.symbol!] = token;
          await this.tokenCache.set(this.CACHE_KEY(this.chainId, address.toLowerCase()), addressToToken[address]!);
        }
      }
    }

    return {
      getTokenByAddress: (address: string): Token | undefined => {
        return addressToToken[address.toLowerCase()];
      },
      getTokenBySymbol: (symbol: string): Token | undefined => {
        return symbolToToken[symbol.toLowerCase()];
      },
      getAllTokens: (): Token[] => {
        return Object.values(addressToToken);
      },
    };
  }
}
