import { BigNumber } from 'ethers';
import { getTokenAllowance } from 'functions/fetch-data/approval/get-token-allowance';
import { CheckIsTokenApprovedArgs } from 'types/approve-token';

/**
 * Check if token is approved for a given owner and spender
 * @param chainId Chain ID
 * @param tokenAddress Token address
 * @param owner Owner address
 * @param amount Amount to approve
 * @param spender Spender address (Optional - Default to permit2 address)
 * @returns Object with allowance and isApproved flag
 */
const checkIsTokenApproved = async ({
  amount,
  ...restProps
}: CheckIsTokenApprovedArgs): Promise<{ allowance: BigNumber; isApproved: boolean }> => {
  const allowance = await getTokenAllowance({
    ...restProps,
  });

  if (!allowance)
    return {
      allowance,
      isApproved: false,
    };

  return { allowance, isApproved: allowance.gte(amount) };
};

export { checkIsTokenApproved };
