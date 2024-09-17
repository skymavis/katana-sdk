import { AVERAGE_RONIN_L1_BLOCK_TIME } from 'constants/misc';
import { CheckIsSignedPermitAllowanceArgs, CheckIsValidPermitAllowanceArgs } from 'types/permit';

/**
 * Get the interval time to check if the permit signature is still valid
 * @param blockTime Average block time in milliseconds
 * @returns Interval time in seconds
 */
const getIntervalTimeCheckPermit = (blockTime = AVERAGE_RONIN_L1_BLOCK_TIME): number => {
  let now = (Date.now() + blockTime) / 1000;
  setInterval(() => {
    now = (Date.now() + blockTime) / 1000;
  }, blockTime);
  return now;
};

/**
 * Check if the signature is valid for the permit allowance
 * @param token Token address
 * @param signature Signature
 * @param spender Spender address
 * @param now Current time in seconds (NOTE: Signature will expire, so it should be rechecked at an interval. Calculate now such that the signature will still be valid for the submitting block)
 * @returns Boolean
 */
const checkIsSignedPermitAllowance = ({
  token,
  signature,
  spender,
  now,
}: CheckIsSignedPermitAllowanceArgs): boolean => {
  if (!signature) {
    return false;
  }

  return signature.details.token === token && signature.spender === spender && signature.sigDeadline >= now;
};

/**
 * Check if the permit allowance is valid
 * @param permitAllowance Permit allowance data read from the contract
 * @param amount Amount to check
 * @param permitExpiration Permit expiration time
 * @param now Current time in seconds (NOTE: PermitAllowance will expire, so it should be rechecked at an interval. Calculate now such that the signature will still be valid for the submitting block)
 * @returns Boolean
 */
const checkIsValidPermitAllowance = ({
  now,
  permitAllowance,
  permitExpiration,
  amount,
}: CheckIsValidPermitAllowanceArgs): boolean => {
  if (!amount || !permitAllowance || !permitExpiration) {
    return false;
  }
  return permitAllowance.gte(amount) && permitExpiration >= now;
};

export { checkIsSignedPermitAllowance, checkIsValidPermitAllowance, getIntervalTimeCheckPermit };
