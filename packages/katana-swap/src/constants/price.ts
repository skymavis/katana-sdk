import { ChainId, DEFAULT_ERC20, RON } from '@sky-mavis/katana-core';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';

// Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
const STABLECOIN_AMOUNT_OUT: { [chainId: number]: CurrencyAmount<Token> } = {
  [ChainId.mainnet]: CurrencyAmount.fromRawAmount(DEFAULT_ERC20[ChainId.mainnet].USDC, 1e10),
  [ChainId.testnet]: CurrencyAmount.fromRawAmount(DEFAULT_ERC20[ChainId.testnet].USDC, 1e10),
};

// RON amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
const RON_AMOUNT_OUT: { [chainId: number]: CurrencyAmount<RON> } = {
  [ChainId.mainnet]: CurrencyAmount.fromRawAmount(RON.onChain(ChainId.mainnet), 3e21),
  [ChainId.testnet]: CurrencyAmount.fromRawAmount(RON.onChain(ChainId.testnet), 6e20),
};

const PYTH_RON_ID: { [chainId: number]: string } = {
  [ChainId.mainnet]: '0x97cfe19da9153ef7d647b011c5e355142280ddb16004378573e6494e499879f3',
  [ChainId.testnet]: '0x4cb9d530b042004b042e165ee0904b12fe534d40dac5fe1c71dfcdb522e6e3c2',
};

export { PYTH_RON_ID, RON_AMOUNT_OUT, STABLECOIN_AMOUNT_OUT };
