import { ChainId } from '@sky-mavis/katana-core';
import { Token } from '@uniswap/sdk-core';
import axios from 'axios';

import { DAPP_OFFCHAIN_URL } from '../../constants/url';
import { IAllPublicTokens } from '../../types';
import { toReadableError } from '../../utils/errors';

/**
 * Get all tokens from Katana V2 and V3 subgraph
 * @param chainId
 */
const getAllTokens = async (
  chainId: ChainId,
): Promise<{
  mapTokens: { [tokenAddressLowercase: string]: Token };
  arrTokens: Token[];
  arrTokenAddresses: string[];
}> => {
  try {
    const data = await axios.get(DAPP_OFFCHAIN_URL[chainId]);

    const mapTokens: { [tokenAddressLowercase: string]: Token } = {};
    const arrTokenAddresses: string[] = [];

    (data.data.results.data as IAllPublicTokens[])?.map(token => {
      if (!token?.is_active || !token?.token_address || !token?.token_decimals || !token?.tag) return;

      mapTokens[token.token_address.toLowerCase()] = new Token(
        chainId,
        token.token_address,
        parseInt(token.token_decimals),
        token.token_symbol,
        token.token_name,
      );

      arrTokenAddresses.push(token.token_address);
    });
    return { mapTokens, arrTokens: Object.values(mapTokens), arrTokenAddresses };
  } catch (error: any) {
    console.error(toReadableError('Fetch all public tokens failed:', error));
    throw error;
  }
};

export { getAllTokens };
