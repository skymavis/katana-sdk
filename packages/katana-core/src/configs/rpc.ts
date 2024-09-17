import { ChainId } from './chain';

const RPC_URL: Record<ChainId, string> = {
  [ChainId.mainnet]: 'https://api.roninchain.com/rpc',
  [ChainId.testnet]: 'https://saigon-testnet.roninchain.com/rpc',
} as const;

export { RPC_URL };
