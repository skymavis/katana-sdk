import { ChainId } from 'configs/chain';
import { KATANA_SUBGRAPH_URL } from 'constants/url';

import { fetchGraphQl } from '.';

const GET_TOKENS = `
  query tokens {
    tokens {
      id
      name
      symbol
      decimals
      derivedETH
    }
  }
`;

enum KatanaV2Query {
  GET_TOKENS = 'GET_TOKENS',
}
const KatanaV2QueryDocument: Record<KatanaV2Query, string> = {
  GET_TOKENS: GET_TOKENS,
} as const;

const getKatanaV2GraphqlBase = async (chainId: ChainId, query: string, variables?: Record<string, any> | undefined) => {
  try {
    const result = await fetchGraphQl(KATANA_SUBGRAPH_URL[chainId], query, variables);
    return result?.data;
  } catch (err) {
    throw new Error(`Failed to fetch Katana V2 subgraph: ${err}`);
  }
};

const getKatanaV2Graphql = async (
  chainId: ChainId,
  queryType: KatanaV2Query,
  variables?: Record<string, any> | undefined,
) => {
  return await getKatanaV2GraphqlBase(chainId, KatanaV2QueryDocument[queryType], variables);
};

export { getKatanaV2Graphql, KatanaV2Query };
