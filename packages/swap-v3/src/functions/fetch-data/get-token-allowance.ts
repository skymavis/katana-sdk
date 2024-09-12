import { PERMIT2_ADDRESS } from '@axieinfinity/sdk-core';
import ERC20_ABI from 'abis/ERC20.json';
import { Erc20 } from 'contracts';
import { BigNumber } from 'ethers';
import { GetTokenAllowanceArgs } from 'types/approval';
import { checkAddress } from 'utils/address';
import { getContract } from 'utils/contract';
import { getRoninReadProvider } from 'utils/provider';

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
  if (!checkAddress(owner) || !checkAddress(spender) || !checkAddress(tokenAddress)) {
    throw new Error('Invalid arguments');
  }

  const spenderAddress = spender || PERMIT2_ADDRESS[chainId];

  const contract = getContract({
    address: tokenAddress,
    ABI: ERC20_ABI,
    provider: getRoninReadProvider(chainId),
  }) as Erc20;

  if (!contract) {
    throw new Error('Cannot get contract');
  }

  return contract.allowance(owner, spenderAddress);
};

export { getTokenAllowance };
