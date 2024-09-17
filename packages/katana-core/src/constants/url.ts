import { ChainId } from 'configs/chain';

const KATANA_ROUTING_API_URL = 'https://8z7ez8s2pc.execute-api.us-east-2.amazonaws.com/prod';

const SUBGRAPH_DOMAIN_MAINNET_BASE = 'https://thegraph-v2.roninchain.com';

const KATANA_SUBGRAPH_URL: Record<ChainId, string> = {
  [ChainId.mainnet]: `${SUBGRAPH_DOMAIN_MAINNET_BASE}/subgraphs/name/axieinfinity/katana-subgraph-blue`,
  [ChainId.testnet]: 'https://saigon-thegraph.roninchain.com/subgraphs/name/axieinfinity/katana-subgraph-green',
};

const KATANA_V3_SUBGRAPH_URL: Record<ChainId, string> = {
  [ChainId.mainnet]: ``,
  [ChainId.testnet]: 'https://saigon-thegraph.roninchain.com/subgraphs/name/axieinfinity/katana-v3',
};

export { KATANA_ROUTING_API_URL, KATANA_SUBGRAPH_URL, KATANA_V3_SUBGRAPH_URL };
