import { UNIVERSAL_ROUTER_ADDRESS } from '@axieinfinity/sdk-core';
import { Percent } from '@uniswap/sdk-core';
import { SwapRouter } from '@uniswap/universal-router-sdk';
import { toHex } from '@uniswap/v3-sdk';
import { ChainId } from 'configs/chain';
import { DEFAULT_SWAP_SLIPPAGE, DEFAULT_TX_DEADLINE } from 'constants/misc';
import { KatanaTrade } from 'types/katana-trade';
import { PermitSignature } from 'types/permit';
import { WalletInfo } from 'types/wallet';
import { toReadableError } from 'utils/errors';
import { getDeadline } from 'utils/get-deadline';
import isZero from 'utils/is-zero';
import { calculateGasMargin, getUniversalRouterFeeFields } from 'utils/swap';

type SwapArgs = {
  chainId: ChainId;
  wallet: WalletInfo;
  trade: KatanaTrade;
  permitSignature?: PermitSignature;
  slippageTolerance?: Percent;
  txDeadlineInSeconds?: number;
  onSubmitted?: (txHash: string) => void;
  onSuccess?: (receipt: any) => void;
};

/**
 * Swap ERC20 tokens using the Universal Router
 * @param chainId - The chain ID
 * @param wallet - Object containing the account and provider
 * @param trade - The trade to execute
 * @param permitSignature - The permit signature of the input token (Optional)
 * @param txDeadlineInSeconds - The transaction deadline in seconds (Optional, default: 30 minutes)
 * @param slippageTolerance - The slippage tolerance for the swap (Optional, default: 0.50%)
 * @param onSubmitted - Callback when the transaction is submitted (Optional)
 * @param onSuccess - Callback when the transaction is successful (Optional)
 * @returns Transaction receipt
 */
const swap = async ({
  chainId,
  wallet: { account, provider },
  trade,
  permitSignature,
  slippageTolerance = DEFAULT_SWAP_SLIPPAGE,
  txDeadlineInSeconds = DEFAULT_TX_DEADLINE,
  onSubmitted,
  onSuccess,
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
      to: UNIVERSAL_ROUTER_ADDRESS(chainId),
      data: calldata,
      // TODO(https://github.com/Uniswap/universal-router-sdk/issues/113): universal-router-sdk returns a non-hexlified value.
      ...(value && !isZero(value) ? { value: toHex(value) } : {}),
    };

    const gasEstimate = await provider.estimateGas(tx);
    tx.gasLimit = calculateGasMargin(gasEstimate);

    const response = await provider.getUncheckedSigner().sendTransaction({ ...tx });

    onSubmitted && onSubmitted?.(response.hash);

    const receipt = await response.wait();

    if (receipt.status === 1) {
      onSuccess && onSuccess?.(receipt);
    }

    return receipt;
  } catch (error: any) {
    console.error(toReadableError('Swap failed:', error));
    throw error;
  }
};

export { swap };
