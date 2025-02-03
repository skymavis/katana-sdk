import { ChainId } from '@sky-mavis/katana-core';

const KATANA_ROUTING_API_URL = 'https://api.roninchain.com/routing-api/prod';

const DAPP_OFFCHAIN_URL: Record<ChainId, string> = {
  [ChainId.testnet]: 'https://saigon-dapp-offchain.roninchain.com/v1/public/tokens',
  [ChainId.mainnet]: 'https://dapp-offchain.roninchain.com/v1/public/tokens',
};

export { DAPP_OFFCHAIN_URL, KATANA_ROUTING_API_URL };
