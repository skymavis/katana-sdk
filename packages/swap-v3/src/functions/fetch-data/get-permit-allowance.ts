import { UNIVERSAL_ROUTER_ADDRESS } from '@axieinfinity/sdk-core';
import PERMIT2_ABI from 'abis/permit2.json';
import { Permit2 } from 'contracts';
import { BigNumber } from 'ethers';
import { GetPermitAllowanceArgs } from 'types/permit';
import { checkAddress } from 'utils/address';
import { getContract } from 'utils/contract';
import { getRoninReadProvider } from 'utils/provider';

/**
 * Get permit allowance data of a token for a given owner and spender
 * @param tokenAddress Token address
 * @param owner Owner address
 * @param chainId Network chain ID
 * @param spender Spender address (Optional - Default to universal router address)
 * @returns Permit allowance data of Token
 */
const getPermitAllowance = async ({
  tokenAddress,
  owner,
  spender,
  chainId,
}: GetPermitAllowanceArgs): Promise<{
  amount: BigNumber;
  expiration: number;
  nonce: number;
}> => {
  if (!checkAddress(owner) || !checkAddress(spender) || !checkAddress(tokenAddress)) {
    throw new Error('Invalid arguments');
  }

  const spenderAddress = spender || UNIVERSAL_ROUTER_ADDRESS(chainId);

  const contract = getContract({
    address: tokenAddress,
    ABI: PERMIT2_ABI,
    provider: getRoninReadProvider(chainId),
  }) as Permit2;

  if (!contract) {
    throw new Error('Cannot get contract');
  }

  return contract.allowance(owner, tokenAddress, spenderAddress);
};

export { getPermitAllowance };
