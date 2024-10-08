enum ChainId {
  mainnet = 2020,
  testnet = 2021,
}

const SUPPORTED_CHAINS = [ChainId.mainnet, ChainId.testnet] as const;

export { ChainId, SUPPORTED_CHAINS };
