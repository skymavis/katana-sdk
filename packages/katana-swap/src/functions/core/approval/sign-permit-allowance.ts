import { PERMIT2_ADDRESS } from '@sky-mavis/katana-core';
import { AllowanceTransfer } from '@uniswap/permit2-sdk';

import { PermitSignature, SignPermitAllowanceArgs } from '../../../types';
import { toReadableError, WrongChainError } from '../../../utils/errors';
import { signTypedData } from '../../../utils/sign-typed-data';

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

    const signature = await signTypedData(signer, domain, types, values);
    return { ...permit, signature };
  } catch (error: unknown) {
    console.error(toReadableError(`Token permit allowance failed:`, error));
    throw error;
  }
};

export { signPermitAllowance };
