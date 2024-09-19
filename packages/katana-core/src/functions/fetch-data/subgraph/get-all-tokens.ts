import { Token } from '@uniswap/sdk-core';
import { ChainId } from 'configs/chain';
import { DEFAULT_ERC20_DECIMALS } from 'constants/tokens';
import { getKatanaV2Graphql, KatanaV2Query } from 'services/graphql/subgraph-v2';
import { getKatanaV3Graphql, KatanaV3Query } from 'services/graphql/subgraph-v3';
import { Token as TokenFromSubgraph } from 'types/subgraph';
/**
 * Get all tokens from Katana V2 and V3 subgraph
 * @param chainId
 * @returns Object mapping token address to Token interface (https://github.com/Uniswap/sdks/blob/main/sdks/sdk-core/src/entities/token.ts)
 */
const getAllTokens = async (chainId: ChainId): Promise<{ [tokenAddress: string]: Token }> => {
  const [tokensV2, tokensV3] = await Promise.all([
    getKatanaV2Graphql(chainId, KatanaV2Query.GET_TOKENS),
    getKatanaV3Graphql(chainId, KatanaV3Query.GET_TOKENS),
  ]);

  const tokens: { [tokenAddress: string]: Token } = {};

  tokensV2?.tokens?.forEach((token: TokenFromSubgraph) => {
    if (!token) return;
    tokens[token.id] = new Token(
      chainId,
      token.id,
      token.decimals ? parseInt(token.decimals) : DEFAULT_ERC20_DECIMALS,
      token.symbol,
      token.name,
    );
  });

  tokensV3?.tokens?.forEach((token: TokenFromSubgraph) => {
    if (tokens[token.id] || !token) return;
    tokens[token.id] = new Token(
      chainId,
      token.id,
      token.decimals ? parseInt(token.decimals) : DEFAULT_ERC20_DECIMALS,
      token.symbol,
      token.name,
    );
  });

  return tokens;
};

export { getAllTokens };
