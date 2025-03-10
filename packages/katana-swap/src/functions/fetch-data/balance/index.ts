import { ChainId } from '@sky-mavis/katana-core';
import { BigNumber } from 'ethers';

import { MULTICALL2_ADDRESSES } from '../../../constants/address';
import { Erc20__factory, Multicall2, Multicall2__factory } from '../../../contracts';
import { checkAddress } from '../../../utils/address';
import { getContract } from '../../../utils/contract';
import { multipleContractSingleData } from '../../../utils/multicall';
import { getRoninReadProvider } from '../../../utils/provider';

type GetTokenBalancesArgs = {
  tokens: string[];
  account: string;
  chainId: ChainId;
};

/**
 * Get balance of tokens for a given account
 * @param chainId - Chain ID
 * @param account - Account address
 * @param tokens - Array of token addresses
 * @returns Object with token addresses as keys and balances as values
 */
const getTokenBalances = async ({
  chainId,
  account,
  tokens,
}: GetTokenBalancesArgs): Promise<{ [tokenAddress: string]: BigNumber | null }> => {
  if (!tokens || !tokens.length) {
    throw new Error('Tokens are required');
  }

  const validatedTokenAddresses = tokens.filter(t => checkAddress(t) !== false);

  if (!validatedTokenAddresses.length) {
    throw new Error('No valid token addresses provided');
  }

  if (validatedTokenAddresses.length !== tokens.length) {
    throw new Error('Some token addresses are invalid');
  }

  const balances = await multipleContractSingleData({
    addresses: validatedTokenAddresses,
    chainId,
    contractInterface: Erc20__factory.createInterface(),
    methodName: 'balanceOf',
    signerOrProvider: getRoninReadProvider(chainId),
    callInputs: [account],
  });

  return validatedTokenAddresses.reduce<{ [tokenAddress: string]: BigNumber | null }>((acc, token, index) => {
    const rawBalance = balances?.[index]?.result?.[0];
    acc[token] = rawBalance ? BigNumber.from(rawBalance) : null;
    return acc;
  }, {});
};

type GetRonBalanceArgs = {
  account: string;
  chainId: ChainId;
};

/**
 * Get RON balance for a given account
 * @param account - Account address
 * @param chainId - Chain ID
 * @returns RON balance
 */
const getRonBalance = async ({ chainId, account }: GetRonBalanceArgs): Promise<BigNumber> => {
  const multicallContract = getContract({
    address: MULTICALL2_ADDRESSES[chainId],
    ABI: Multicall2__factory.createInterface(),
    provider: getRoninReadProvider(chainId),
    account: account,
  }) as Multicall2;

  if (!multicallContract) {
    throw new Error('Cannot get contract');
  }

  return multicallContract.getRonBalance(account);
};

export { getRonBalance, getTokenBalances };
