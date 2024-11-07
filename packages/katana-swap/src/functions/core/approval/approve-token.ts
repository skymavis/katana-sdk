import { PERMIT2_ADDRESS } from '@sky-mavis/katana-core';
import { MaxUint256 } from '@uniswap/sdk-core';
import { ContractTransaction } from 'ethers';

import { Erc20, Erc20__factory } from '../../../contracts';
import { ApproveTokenArgs } from '../../../types';
import { getContract } from '../../../utils/contract';
import { toReadableError } from '../../../utils/errors';

/**
 * Approve token
 * @param chainId - Chain ID
 * @param tokenAddress - Token address
 * @param wallet - Wallet object
 * @param amount - Amount to approve (Optional - Default to MaxUint256)
 * @param spender - Spender address (Optional - Default to permit2 address)
 */
const approveToken = async ({
  chainId,
  tokenAddress,
  wallet,
  amount = MaxUint256.toString(),
  spender,
}: ApproveTokenArgs): Promise<ContractTransaction> => {
  const spenderAddress = spender || PERMIT2_ADDRESS[chainId];

  const contract = getContract({
    address: tokenAddress,
    ABI: Erc20__factory.createInterface(),
    provider: wallet.provider,
    account: wallet.account,
  }) as Erc20;

  if (!contract) {
    throw new Error('Cannot get contract');
  }

  try {
    const response = await contract.approve(spenderAddress, amount);
    return response;
  } catch (error) {
    console.error(toReadableError(`Approve token failed:`, error));
    throw error;
  }
};

export { approveToken };
