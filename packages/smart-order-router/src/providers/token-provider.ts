import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { parseBytes32String } from '@ethersproject/strings';
import { ChainId, DEFAULT_ERC20 } from '@sky-mavis/katana-core';
import { Token } from '@uniswap/sdk-core';
import _ from 'lodash';

import { IERC20Metadata__factory } from '../types/v3/factories/IERC20Metadata__factory';
import { log } from '../util';
import { IMulticallProvider, Result } from './multicall-provider';
import { ProviderConfig } from './provider';

/**
 * Provider for getting token data.
 *
 * @export
 * @interface ITokenProvider
 */
export interface ITokenProvider {
  /**
   * Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.
   *
   * @param addresses The token addresses to get.
   * @param [providerConfig] The provider config.
   * @returns A token accessor with methods for accessing the tokens.
   */
  getTokens(addresses: string[], providerConfig?: ProviderConfig): Promise<TokenAccessor>;
}

export type TokenAccessor = {
  getTokenByAddress(address: string): Token | undefined;
  getTokenBySymbol(symbol: string): Token | undefined;
  getAllTokens: () => Token[];
};

// Some well known tokens on each chain for seeding cache / testing.
export const USDC_RONIN_TESTNET: Token = DEFAULT_ERC20[ChainId.testnet].USDC;
export const USDC_RONIN_MAINNET: Token = DEFAULT_ERC20[ChainId.mainnet].USDC;

export class TokenProvider implements ITokenProvider {
  constructor(
    private chainId: ChainId,
    protected multicall2Provider: IMulticallProvider,
  ) {}

  private async getTokenSymbol(
    addresses: string[],
    providerConfig?: ProviderConfig,
  ): Promise<{
    result: {
      blockNumber: BigNumber;
      results: Result<[string]>[];
    };
    isBytes32: boolean;
  }> {
    let result;
    let isBytes32 = false;

    try {
      result = await this.multicall2Provider.callSameFunctionOnMultipleContracts<undefined, [string]>({
        addresses,
        contractInterface: IERC20Metadata__factory.createInterface(),
        functionName: 'symbol',
        providerConfig,
      });
    } catch (error) {
      log.error({ addresses }, `TokenProvider.getTokenSymbol[string] failed with error ${error}. Trying with bytes32.`);

      const bytes32Interface = new Interface([
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ]);

      try {
        result = await this.multicall2Provider.callSameFunctionOnMultipleContracts<undefined, [string]>({
          addresses,
          contractInterface: bytes32Interface,
          functionName: 'symbol',
          providerConfig,
        });
        isBytes32 = true;
      } catch (error) {
        log.fatal({ addresses }, `TokenProvider.getTokenSymbol[bytes32] failed with error ${error}.`);

        throw new Error('[TokenProvider.getTokenSymbol] Impossible to fetch token symbol.');
      }
    }

    return { result, isBytes32 };
  }

  private async getTokenDecimals(addresses: string[], providerConfig?: ProviderConfig) {
    return this.multicall2Provider.callSameFunctionOnMultipleContracts<undefined, [number]>({
      addresses,
      contractInterface: IERC20Metadata__factory.createInterface(),
      functionName: 'decimals',
      providerConfig,
    });
  }

  public async getTokens(_addresses: string[], providerConfig?: ProviderConfig): Promise<TokenAccessor> {
    const addressToToken: { [address: string]: Token } = {};
    const symbolToToken: { [symbol: string]: Token } = {};

    const addresses = _(_addresses)
      .map(address => address.toLowerCase())
      .uniq()
      .value();

    if (addresses.length > 0) {
      const [symbolsResult, decimalsResult] = await Promise.all([
        this.getTokenSymbol(addresses, providerConfig),
        this.getTokenDecimals(addresses, providerConfig),
      ]);

      const isBytes32 = symbolsResult.isBytes32;
      const { results: symbols } = symbolsResult.result;
      const { results: decimals } = decimalsResult;

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i]!;

        const symbolResult = symbols[i];
        const decimalResult = decimals[i];

        if (!symbolResult?.success || !decimalResult?.success) {
          log.info(
            {
              symbolResult,
              decimalResult,
            },
            `Dropping token with address ${address} as symbol or decimal are invalid`,
          );
          continue;
        }

        const symbol = isBytes32 ? parseBytes32String(symbolResult.result[0]!) : symbolResult.result[0]!;
        const decimal = decimalResult.result[0]!;

        addressToToken[address.toLowerCase()] = new Token(this.chainId, address, decimal, symbol);
        symbolToToken[symbol.toLowerCase()] = addressToToken[address.toLowerCase()]!;
      }

      log.info(
        `Got token symbol and decimals for ${
          Object.values(addressToToken).length
        } out of ${addresses.length} tokens on-chain ${providerConfig ? `as of: ${providerConfig?.blockNumber}` : ''}`,
      );
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

export const USDC_ON = (chainId: ChainId): Token => {
  switch (chainId) {
    case ChainId.mainnet:
      return USDC_RONIN_TESTNET;
    case ChainId.testnet:
      return USDC_RONIN_TESTNET;
    default:
      throw new Error(`Chain id: ${chainId} not supported`);
  }
};
