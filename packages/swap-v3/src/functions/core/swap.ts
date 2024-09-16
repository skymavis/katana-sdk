import { Percent, UNIVERSAL_ROUTER_ADDRESS } from '@axieinfinity/sdk-core';
import { SwapRouter } from '@uniswap/universal-router-sdk';
import { toHex } from '@uniswap/v3-sdk';
import { ChainId } from 'configs/chain';
import { DEFAULT_SWAP_SLIPPAGE, DEFAULT_TX_DEADLINE } from 'constants/misc';
import { BigNumber } from 'ethers';
import { getDeadline } from 'functions/utils';
import { KatanaTrade } from 'types/katana-trade';
import { PermitSignature } from 'types/permit';
import { WalletInfo } from 'types/wallet';
import { didUserReject, GasEstimationError, UserRejectedRequestError } from 'utils/errors';
import isZero from 'utils/is-zero';
import { calculateGasMargin, getUniversalRouterFeeFields } from 'utils/swap';
import { swapErrorToUserReadableMessage } from 'utils/swap-error';

type SwapArgs = {
  chainId: ChainId;
  wallet: WalletInfo;
  trade: KatanaTrade;
  permitSignature: PermitSignature;
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
 * @param permitSignature - The permit signature of the input token
 * @param txDeadlineInSeconds - The transaction deadline in seconds (Optional, default: 30 minutes)
 * @param slippageTolerance - The slippage tolerance for the swap (Optional, default: 0.50%)
 * @param onSubmitted - Callback when the transaction is submitted (Optional)
 * @param onSuccess - Callback when the transaction is successful (Optional)
 * @returns Transaction receipt
 */
const swap = async ({
  permitSignature,
  trade,
  slippageTolerance = DEFAULT_SWAP_SLIPPAGE,
  txDeadlineInSeconds = DEFAULT_TX_DEADLINE,
  chainId,
  wallet: { account, provider },
  onSubmitted,
  onSuccess,
}: SwapArgs) => {
  try {
    if (!permitSignature) {
      throw new Error('Permit signature is required');
    }
    if (!trade) {
      throw new Error('Trade is required');
    }

    if (!account || !provider) {
      throw new Error('Wallet is required');
    }

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

    let gasLimit: BigNumber;
    try {
      const gasEstimate = await provider.estimateGas(tx);
      gasLimit = calculateGasMargin(gasEstimate);
      tx.gasLimit = gasLimit;
    } catch (gasError) {
      console.error(gasError);

      throw new GasEstimationError();
    }

    try {
      const response = await provider.getUncheckedSigner().sendTransaction({ ...tx });

      onSubmitted && onSubmitted?.(response.hash);

      const receipt = await response.wait();

      if (receipt.status === 1) {
        onSuccess && onSuccess?.(receipt);
        return receipt;
      }

      throw new Error('Transaction failed with status 0');
    } catch (error) {
      if (didUserReject(error)) {
        throw new UserRejectedRequestError(swapErrorToUserReadableMessage(error));
      } else {
        throw error;
      }
    }
  } catch (error: any) {
    let newError;

    if (error instanceof GasEstimationError) {
      newError = {
        title: 'Estimate gas failed',
        message: 'Your swap is expected to fail.',
      };
    } else if (error instanceof UserRejectedRequestError) {
      newError = {
        title: 'Swap failed',
        message: 'Transaction rejected.',
      };
    } else {
      newError = {
        title: 'Swap failed',
        message: swapErrorToUserReadableMessage(error),
      };
    }

    throw newError;
  }
};

export { swap };
