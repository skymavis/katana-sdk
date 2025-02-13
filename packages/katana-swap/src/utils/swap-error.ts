import { didUserReject, getReasonFromError } from './errors';

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error - An error from the ethers provider
 */
const swapErrorToUserReadableMessage = (error: any): string => {
  if (didUserReject(error)) {
    return `Transaction rejected`;
  }

  let reason = getReasonFromError(error);
  if (reason?.indexOf('execution reverted: ') === 0) {
    reason = reason.substr('execution reverted: '.length);
  }

  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return `This transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.`;
    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return `This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.`;
    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return `The input token cannot be transferred. There may be an issue with the input token.`;
    case 'UniswapV2: TRANSFER_FAILED':
      return `The output token cannot be transferred. There may be an issue with the output token.`;
    case 'UniswapV2: K':
      return `The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.`;
    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return `This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.`;
    case 'TF':
      return `The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.`;
    default:
      if (reason?.indexOf('undefined is not an object') !== -1) {
        console.error(error, reason);
        return `An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee-on-transfer and rebase tokens are incompatible with Uniswap V3.`;
      }
      return `${
        reason ? reason : 'Unknown error.'
      } You may need to increase your slippage tolerance. Note: fee-on-transfer and rebase tokens are incompatible with Uniswap V3.`;
  }
};

export { swapErrorToUserReadableMessage };
