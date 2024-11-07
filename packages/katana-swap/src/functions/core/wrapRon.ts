import { ChainId, DEFAULT_ERC20, RON } from '@sky-mavis/katana-core';
import { ContractTransaction } from 'ethers';

import { Wron, Wron__factory } from '../../contracts';
import { WalletInfo } from '../../types';
import { getContract } from '../../utils/contract';
import tryParseCurrencyAmount from '../../utils/try-parse-currency-amount';
import { checkIsInsufficientRonBalance } from '../utils';

type WrapRonArgs = {
  chainId: ChainId;
  wallet: WalletInfo;
  amount: string;
};

/**
 * Wrap RON to WRON
 * @param chainId - Chain id
 * @param wallet - Wallet info
 * @param amount - Amount to wrap
 */
const wrapRon = async ({ amount, chainId, wallet }: WrapRonArgs): Promise<ContractTransaction> => {
  const parsedAmount = tryParseCurrencyAmount(amount, RON.onChain(chainId));

  if (!parsedAmount) {
    throw new Error('Could not parse amount');
  }

  const { isInsufficient: isInsufficientRonBalance, ronBalance } = await checkIsInsufficientRonBalance({
    account: wallet.account,
    chainId,
    amount: parsedAmount.quotient.toString(),
  });

  if (isInsufficientRonBalance) {
    throw new Error(`Insufficient RON balance: ${ronBalance?.toString()}`);
  }

  const wronContract = getContract({
    address: DEFAULT_ERC20[chainId].WRON.address,
    ABI: Wron__factory.createInterface(),
    provider: wallet.provider,
  }) as Wron;

  if (!wronContract) {
    throw new Error('Could not get wron contract');
  }

  return wronContract.deposit({
    value: `0x${parsedAmount.quotient.toString(16)}`,
  });
};

export { wrapRon };
