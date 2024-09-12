import { PERMIT2_ADDRESS } from '@axieinfinity/sdk-core';
import ERC20_ABI from 'abis/ERC20.json';
import { Erc20 } from 'contracts';
import { ContractTransaction } from 'ethers';
import { ApproveTokenArgs } from 'types/approve-token';
import { getContract } from 'utils/contract';
import { didUserReject, UserRejectedRequestError } from 'utils/errors';

/**
 * Approve token
 * @param amount - Amount to approve
 * @param tokenAddress - Token address
 * @param chainId - Chain ID
 * @param owner - Owner address
 * @param wallet - Wallet object
 * @param spender - Spender address (Optional - Default to permit2 address)
 */
const approveToken = async ({
  amount,
  tokenAddress,
  spender,
  chainId,
  owner,
  wallet,
}: ApproveTokenArgs): Promise<ContractTransaction> => {
  if (!amount || !tokenAddress || !chainId || !owner || !wallet || !wallet?.account || !wallet?.provider) {
    throw new Error('Missing required parameters');
  }

  const spenderAddress = spender || PERMIT2_ADDRESS[chainId];

  const contract = getContract({
    address: tokenAddress,
    ABI: ERC20_ABI,
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
    if (didUserReject(error)) {
      throw new UserRejectedRequestError(`Approve token failed: User rejected`);
    } else {
      throw error;
    }
  }
};

export { approveToken };
