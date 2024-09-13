import { ChainId } from 'configs/chain';
import { DEFAULT_ERC20 } from 'constants/tokens';
import { RON } from 'constants/tokens/ron';
import { Wron, Wron__factory } from 'contracts';
import { ContractTransaction } from 'ethers';
import { checkIsInsufficientRonBalance } from 'functions/utils';
import { WalletInfo } from 'types/wallet';
import { getContract } from 'utils/contract';
import tryParseCurrencyAmount from 'utils/try-parse-currency-amount';

type WrapRonArgs = {
  wallet: WalletInfo;
  chainId: ChainId;
  amount: string;
};

/**
 * Wrap RON to WRON
 * @param wallet - Wallet info
 * @param chainId - Chain id
 * @param amount - Amount to wrap
 */
const wrapRon = async ({ amount, chainId, wallet }: WrapRonArgs): Promise<ContractTransaction> => {
  if (!wallet || !wallet?.account || !wallet?.provider) {
    throw new Error('Wallet is required');
  }

  if (!amount) {
    throw new Error('Amount is required');
  }

  if (!chainId) {
    throw new Error('ChainId is required');
  }

  const parsedAmount = tryParseCurrencyAmount(amount, RON.onChain(chainId));

  if (!parsedAmount) {
    throw new Error('Could not parse amount');
  }

  const { isInsufficient: isInsufficientRonBalance, ronBalance } = await checkIsInsufficientRonBalance({
    account: wallet.account,
    chainId,
    rawAmount: parsedAmount.toExact(),
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
