import { ChainId } from '@sky-mavis/katana-core';

import { EIP1559GasPriceProvider } from './eip-1559-gas-price-provider';
import { GasPrice, IGasPriceProvider } from './gas-price-provider';
import { LegacyGasPriceProvider } from './legacy-gas-price-provider';

const DEFAULT_EIP_1559_SUPPORTED_CHAINS = [ChainId.mainnet, ChainId.testnet];

/**
 * Gets gas prices on chain. If the chain supports EIP-1559 and has the feeHistory API,
 * uses the EIP1559 provider. Otherwise it will use a legacy provider that uses eth_gasPrice
 *
 * @export
 * @class OnChainGasPriceProvider
 */
export class OnChainGasPriceProvider extends IGasPriceProvider {
  constructor(
    protected chainId: ChainId,
    protected eip1559GasPriceProvider: EIP1559GasPriceProvider,
    protected legacyGasPriceProvider: LegacyGasPriceProvider,
    protected eipChains: ChainId[] = DEFAULT_EIP_1559_SUPPORTED_CHAINS,
  ) {
    super();
  }

  public override async getGasPrice(latestBlockNumber: number, requestBlockNumber?: number): Promise<GasPrice> {
    if (this.eipChains.includes(this.chainId)) {
      return this.eip1559GasPriceProvider.getGasPrice(latestBlockNumber, requestBlockNumber);
    }

    return this.legacyGasPriceProvider.getGasPrice(latestBlockNumber, requestBlockNumber);
  }
}
