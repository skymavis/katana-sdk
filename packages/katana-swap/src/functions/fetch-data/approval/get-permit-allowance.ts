import { PERMIT2_ADDRESS, UNIVERSAL_ROUTER_ADDRESS } from '@sky-mavis/katana-core';
import { BigNumber } from 'ethers';

import { Permit2, Permit2__factory } from '../../../contracts';
import { GetPermitAllowanceArgs } from '../../../types';
import { checkAddress } from '../../../utils/address';
import { getContract } from '../../../utils/contract';
import { getRoninReadProvider } from '../../../utils/provider';

/**
 * Get permit allowance data of a token for a given owner and spender
 * @param chainId Network chain ID
 * @param tokenAddress Token address
 * @param owner Owner address
 * @param spender Spender address (Optional - Default to universal router address)
 * @returns Permit allowance data of Token
 */
const getPermitAllowance = async ({
  chainId,
  tokenAddress,
  owner,
  spender,
}: GetPermitAllowanceArgs): Promise<{
  amount: BigNumber;
  expiration: number;
  nonce: number;
}> => {
  if (!checkAddress(owner) || (spender && !checkAddress(spender)) || !checkAddress(tokenAddress)) {
    throw new Error('Invalid arguments');
  }

  const spenderAddress = spender || UNIVERSAL_ROUTER_ADDRESS[chainId];

  const contract = getContract({
    address: PERMIT2_ADDRESS[chainId],
    ABI: Permit2__factory.createInterface(),
    provider: getRoninReadProvider(chainId),
  }) as Permit2;

  if (!contract) {
    throw new Error('Cannot get contract');
  }

  return contract.allowance(owner, tokenAddress, spenderAddress);
};

export { getPermitAllowance };
