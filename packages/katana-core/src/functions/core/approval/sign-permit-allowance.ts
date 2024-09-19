import { AllowanceTransfer, PERMIT2_ADDRESS } from '@uniswap/permit2-sdk';
import { PermitSignature, SignPermitAllowanceArgs } from 'types/permit';
import { didUserReject, toReadableError, UserRejectedRequestError, WrongChainError } from 'utils/errors';
import { signTypedData } from 'utils/sign-typed-data';

/**
 * Sign the permit allowance
 * @param chainId Chain ID
 * @param wallet Wallet object
 * @param permit Permit object
 * @returns Permit object with signature
 */
const signPermitAllowance = async ({ chainId, wallet, permit }: SignPermitAllowanceArgs): Promise<PermitSignature> => {
  try {
    const signer = wallet.provider.getSigner();
    const signerChainId = await signer.getChainId();

    if (chainId !== signerChainId) {
      throw WrongChainError;
    }

    const { domain, types, values } = AllowanceTransfer.getPermitData(permit, PERMIT2_ADDRESS[chainId], chainId);

    try {
      const signature = await signTypedData(signer, domain, types, values);
      return { ...permit, signature };
    } catch (error) {
      if (didUserReject(error)) {
        throw new UserRejectedRequestError(`Token permit allowance failed: User rejected signature`);
      } else {
        throw error;
      }
    }
  } catch (error: unknown) {
    if (error instanceof UserRejectedRequestError) {
      throw error;
    } else {
      throw toReadableError(`Token permit allowance failed:`, error);
    }
  }
};

export { signPermitAllowance };
