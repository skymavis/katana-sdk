import { getTokenAllowance } from 'functions/fetch-data/get-token-allowance';
import { CheckIsTokenApprovedArgs } from 'types/approval';

/**
 * Check if token is approved for a given owner and spender
 * @param tokenAddress Token address
 * @param owner Owner address
 * @param chainId Chain ID
 * @param amount Amount to approve
 * @param spender Spender address (Optional - Default to permit2 address)
 * @returns True if token is approved, false otherwise
 */
const checkIsTokenApproved = async ({ amount, ...restProps }: CheckIsTokenApprovedArgs): Promise<boolean> => {
  const allowance = await getTokenAllowance({
    ...restProps,
  });

  if (!allowance) return false;

  return allowance.gte(amount);
};

export { checkIsTokenApproved };
