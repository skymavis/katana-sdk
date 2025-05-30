import { ChainId, UNIVERSAL_ROUTER_ADDRESS } from '@sky-mavis/katana-core';
import { Percent } from '@uniswap/sdk-core';
import { SwapRouter } from '@uniswap/universal-router-sdk';
import { toHex } from '@uniswap/v3-sdk';

import { DEFAULT_SWAP_SLIPPAGE, DEFAULT_TX_DEADLINE } from '../../constants/misc';
import { KatanaTrade, PermitSignature, WalletInfo } from '../../types';
import { toReadableError } from '../../utils/errors';
import { getDeadline } from '../../utils/get-deadline';
import isZero from '../../utils/is-zero';
import { calculateGasMargin, getUniversalRouterFeeFields } from '../../utils/swap';

type SwapArgs = {
  chainId: ChainId;
  wallet: WalletInfo;
  trade: KatanaTrade;
  permitSignature?: PermitSignature;
  slippageTolerance?: Percent;
  txDeadlineInSeconds?: number;
};

/**
 * Swap ERC20 tokens using the Universal Router
 * @param chainId - The chain ID
 * @param wallet - Object containing the account and provider
 * @param trade - The trade to execute
 * @param permitSignature - The permit signature of the input token (Optional)
 * @param txDeadlineInSeconds - The transaction deadline in seconds (Optional, default: 30 minutes)
 * @param slippageTolerance - The slippage tolerance for the swap (Optional, default: 0.50%)
 * @returns Transaction response
 */
const swap = async ({
  chainId,
  wallet: { account, provider },
  trade,
  permitSignature,
  slippageTolerance = DEFAULT_SWAP_SLIPPAGE,
  txDeadlineInSeconds = DEFAULT_TX_DEADLINE,
}: SwapArgs) => {
  try {
    const swapOptions = {
      slippageTolerance: slippageTolerance,
      inputTokenPermit: permitSignature,
      ...getUniversalRouterFeeFields(trade),
    };

    const deadline = await getDeadline(txDeadlineInSeconds, chainId);

    const { calldata, value } = SwapRouter.swapERC20CallParameters(trade, {
      deadlineOrPreviousBlockhash: deadline?.toString(),
      ...swapOptions,
    });

    const tx: any = {
      from: account,
      to: UNIVERSAL_ROUTER_ADDRESS[chainId],
      data: calldata,
      // TODO(https://github.com/Uniswap/universal-router-sdk/issues/113): universal-router-sdk returns a non-hexlified value.
      ...(value && !isZero(value) ? { value: toHex(value) } : {}),
    };

    const gasEstimate = await provider.estimateGas(tx);
    tx.gasLimit = calculateGasMargin(gasEstimate);

    return provider.getSigner(account).sendTransaction({ ...tx });
  } catch (error: any) {
    console.error(toReadableError('Swap failed:', error));
    throw error;
  }
};

export { swap };
