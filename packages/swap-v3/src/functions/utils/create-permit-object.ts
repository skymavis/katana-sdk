import { MaxAllowanceTransferAmount } from '@uniswap/permit2-sdk';
import { CreatePermitArgs, Permit } from 'types/permit';

const PERMIT_EXPIRATION = 2592000000; // 30 days in milliseconds
const PERMIT_SIG_EXPIRATION = 1800000; // 30 minutes in milliseconds

const toDeadline = (expiration: number): number => {
  return Math.floor((Date.now() + expiration) / 1000);
};

/**
 * Create a permit object
 * @param token Token address
 * @param spender Spender address
 * @param nonce Nonce number
 * @param amount Allowance transfer amount (Optional - Default to MaxAllowanceTransferAmount from permit2-sdk)
 * @param expiration Permit expiration time (Optional - Default to 30 days)
 * @param sigDeadline Permit signature expiration time (Optional - Default to 30 minutes)
 * @returns
 */
const createPermitObj = ({
  token,
  spender,
  nonce,
  amount,
  expiration = PERMIT_EXPIRATION,
  sigDeadline = PERMIT_SIG_EXPIRATION,
}: CreatePermitArgs): Permit => {
  return {
    details: {
      token,
      amount: amount ?? MaxAllowanceTransferAmount,
      expiration: toDeadline(expiration),
      nonce,
    },
    spender,
    sigDeadline: toDeadline(sigDeadline),
  };
};

export { createPermitObj };
