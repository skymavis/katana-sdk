import { UNIVERSAL_ROUTER_ADDRESS } from '@axieinfinity/sdk-core';
import { AVERAGE_RONIN_L1_BLOCK_TIME } from 'constants/misc';
import { CheckIsValidPermitAllowanceArgs, CheckIsValidPermitAllowanceSignatureArgs } from 'types/permit';

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
 * @param chainId Chain ID
 * @param token Token address
 * @param signature Signature
 * @param now Current time in seconds (NOTE: Signature will expire, so it should be rechecked at an interval. Calculate now such that the signature will still be valid for the submitting block)
 * @param spender Spender address (Optional - Default to universal router address)
 * @returns Boolean
 */
const checkIsValidPermitAllowanceSignature = ({
  chainId,
  token,
  signature,
  now,
  spender = UNIVERSAL_ROUTER_ADDRESS(chainId),
}: CheckIsValidPermitAllowanceSignatureArgs): boolean => {
  if (!signature) {
    return false;
  }

  return signature.details.token === token && signature.spender === spender && signature.sigDeadline >= now;
};

/**
 * Check if the permit allowance is valid
 * @param permitAllowance Permit allowance data read from the contract
 * @param permitExpiration Permit expiration time
 * @param amount Amount to check
 * @param now Current time in seconds (NOTE: PermitAllowance will expire, so it should be rechecked at an interval. Calculate now such that the signature will still be valid for the submitting block)
 * @returns Boolean
 */
const checkIsValidPermitAllowance = ({
  permitAllowance,
  permitExpiration,
  amount,
  now,
}: CheckIsValidPermitAllowanceArgs): boolean => {
  if (!permitAllowance || !permitExpiration) {
    return false;
  }
  return permitAllowance.gte(amount) && permitExpiration >= now;
};

export { checkIsValidPermitAllowance, checkIsValidPermitAllowanceSignature, getIntervalTimeCheckPermit };
