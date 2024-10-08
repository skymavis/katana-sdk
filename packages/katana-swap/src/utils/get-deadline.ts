import { ChainId } from '@sky-mavis/katana-core';
import { MULTICALL2_ADDRESSES } from 'constants/address';
import { Multicall2, Multicall2__factory } from 'contracts';
import { BigNumber } from 'ethers';
import { getContract } from 'utils/contract';
import { getRoninReadProvider } from 'utils/provider';

/**
 * An asynchronous function which will get the block timestamp and combine it with user settings for a deadline.
 * Should be used for any submitted transactions, as it uses an on-chain timestamp instead of a client timestamp.
 * @param userDeadline The user setting's deadline in seconds
 * @returns A promise that resolves to a BigNumber representing the deadline
 */
const getDeadline = async (userDeadline: number, chainId: ChainId): Promise<BigNumber> => {
  if (!userDeadline) {
    throw new Error('userDeadline is required');
  }

  const multicall2Contract = getContract({
    address: MULTICALL2_ADDRESSES[chainId],
    ABI: Multicall2__factory.createInterface(),
    provider: getRoninReadProvider(chainId),
  }) as Multicall2;

  const blockTimestamp = await multicall2Contract?.getCurrentBlockTimestamp();

  if (!blockTimestamp) {
    throw new Error('Cannot get block timestamp');
  }

  return blockTimestamp.add(userDeadline);
};

export { getDeadline };
