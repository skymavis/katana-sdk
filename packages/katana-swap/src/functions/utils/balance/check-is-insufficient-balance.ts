import { ChainId } from '@sky-mavis/katana-core';
import { BigNumber } from 'ethers';
import { getRonBalance, getTokenBalances } from 'functions/fetch-data/balance';

type CheckIsInsufficientBalanceArgs = {
  chainId: ChainId;
  tokenAddress: string;
  account: string;
  amount: string;
};

/**
 * Utility function to check if the erc20 balance is insufficient for the requested amount
 * @param chainId - Chain ID
 * @param account - Account address
 * @param tokenAddress - Token address
 * @param amount - Requested amount in raw format
 * @returns Object with token balance and isInsufficient flag
 */
const checkIsInsufficientBalance = async ({
  chainId,
  account,
  tokenAddress,
  amount,
}: CheckIsInsufficientBalanceArgs): Promise<{ tokenBalance?: BigNumber; isInsufficient: boolean }> => {
  const balances = await getTokenBalances({ account, chainId, tokens: [tokenAddress] });
  if (!balances || !balances[tokenAddress]) {
    return { isInsufficient: true };
  }
  return {
    tokenBalance: balances?.[tokenAddress] ?? undefined,
    isInsufficient: balances?.[tokenAddress]?.lt(amount) ?? true,
  };
};

type CheckIsInsufficientRonBalanceArgs = {
  chainId: ChainId;
  account: string;
  amount: string;
};

/**
 * Utility function to check if the ron balance is insufficient for the requested amount
 * @param chainId - Chain ID
 * @param account - Account address
 * @param amount - Requested amount in raw format
 * @returns Object with token balance and isInsufficient flag
 */
const checkIsInsufficientRonBalance = async ({
  chainId,
  account,
  amount,
}: CheckIsInsufficientRonBalanceArgs): Promise<{ ronBalance?: BigNumber; isInsufficient: boolean }> => {
  const balance = await getRonBalance({ account, chainId });
  if (!balance) {
    return { isInsufficient: true };
  }
  return { ronBalance: balance, isInsufficient: balance?.lt(amount) ?? true };
};

export { checkIsInsufficientBalance, checkIsInsufficientRonBalance };
