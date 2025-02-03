import { ChainId, DEFAULT_ERC20, RON } from '@sky-mavis/katana-core';
import { ContractTransaction } from 'ethers';

import { Wron, Wron__factory } from '../../contracts';
import { WalletInfo } from '../../types';
import { getContract } from '../../utils/contract';
import tryParseCurrencyAmount from '../../utils/try-parse-currency-amount';

type UnWrapRonArgs = {
  wallet: WalletInfo;
  chainId: ChainId;
  amount: string;
};

/**
 * Wrap WRON to RON
 * @param chainId - Chain id
 * @param wallet - Wallet info
 * @param amount - Amount to unwrap
 */
const unwrapRon = async ({ amount, chainId, wallet }: UnWrapRonArgs): Promise<ContractTransaction> => {
  const parsedAmount = tryParseCurrencyAmount(amount, RON.onChain(chainId));

  if (!parsedAmount) {
    throw new Error('Could not parse amount');
  }

  const wronContract = getContract({
    address: DEFAULT_ERC20[chainId].WRON.address,
    ABI: Wron__factory.createInterface(),
    ...wallet,
  }) as Wron;

  if (!wronContract) {
    throw new Error('Could not get wron contract');
  }

  return wronContract.withdraw(`0x${parsedAmount.quotient.toString(16)}`);
};

export { unwrapRon };
