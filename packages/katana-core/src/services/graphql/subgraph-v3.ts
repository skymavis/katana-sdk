import { ChainId } from 'configs/chain';
import { KATANA_V3_SUBGRAPH_URL } from 'constants/url';

import { fetchGraphQl } from '.';

const GET_TOKENS = `
  query tokens {
    tokens {
      id
      name
      symbol
      decimals
    }
  }
`;

enum KatanaV3Query {
  GET_TOKENS = 'GET_TOKENS',
}
const KatanaV3QueryDocument: Record<KatanaV3Query, string> = {
  GET_TOKENS: GET_TOKENS,
};

const getKatanaV3GraphqlBase = async (chainId: ChainId, query: string, variables?: Record<string, any> | undefined) => {
  try {
    const result = await fetchGraphQl(KATANA_V3_SUBGRAPH_URL[chainId], query, variables);
    return result?.data;
  } catch (err) {
    throw new Error(`Failed to fetch Katana V3 subgraph: ${err}`);
  }
};

const getKatanaV3Graphql = async (
  chainId: ChainId,
  queryType: KatanaV3Query,
  variables?: Record<string, any> | undefined,
) => {
  return await getKatanaV3GraphqlBase(chainId, KatanaV3QueryDocument[queryType], variables);
};

export { getKatanaV3Graphql, KatanaV3Query };
