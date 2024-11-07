import { PERMIT2_ADDRESS } from '@sky-mavis/katana-core';
import { BigNumber } from 'ethers';

import { Erc20, Erc20__factory } from '../../../contracts';
import { GetTokenAllowanceArgs } from '../../../types';
import { checkAddress } from '../../../utils/address';
import { getContract } from '../../../utils/contract';
import { getRoninReadProvider } from '../../../utils/provider';

/**
 * Get allowance of a token for a given owner and spender
 * @param tokenAddress Token address
 * @param owner Owner address
 * @param chainId Network chain ID
 * @param spender Spender address (Optional - Default to permit2 address)
 * @returns Allowance of Token
 */
const getTokenAllowance = async ({
  tokenAddress,
  owner,
  spender,
  chainId,
}: GetTokenAllowanceArgs): Promise<BigNumber> => {
  if (!checkAddress(owner) || (spender && !checkAddress(spender)) || !checkAddress(tokenAddress)) {
    throw new Error('Invalid address');
  }

  const spenderAddress = spender || PERMIT2_ADDRESS[chainId];

  const contract = getContract<Erc20>({
    address: tokenAddress,
    ABI: Erc20__factory.createInterface(),
    provider: getRoninReadProvider(chainId),
  });

  if (!contract) {
    throw new Error('Cannot get contract');
  }

  return contract.allowance(owner, spenderAddress);
};

export { getTokenAllowance };
