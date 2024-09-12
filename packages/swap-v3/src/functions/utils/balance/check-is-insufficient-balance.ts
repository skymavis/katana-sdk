import { ChainId } from 'configs/chain';
import { getTokenBalances } from 'functions/fetch-data/balance';

type CheckIsInsufficientBalanceArgs = {
  chainId: ChainId;
  tokenAddress: string;
  account: string;
  rawAmount: string;
};

/**
 * Utility function to check if the balance is insufficient for the requested amount
 * @param chainId - Chain ID
 * @param account - Account address
 * @param tokenAddress - Token address
 * @param rawAmount - Requested amount in raw format
 * @returns
 */
const checkIsInsufficientBalance = async ({
  account,
  chainId,
  rawAmount,
  tokenAddress,
}: CheckIsInsufficientBalanceArgs): Promise<boolean> => {
  const balances = await getTokenBalances({ account, chainId, tokens: [tokenAddress] });
  if (!balances || !balances[tokenAddress]) {
    return false;
  }
  return balances?.[tokenAddress]?.lt(rawAmount) ?? false;
};

export { checkIsInsufficientBalance };
