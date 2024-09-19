import { ChainId } from 'configs/chain';
import { DEFAULT_ERC20 } from 'constants/tokens';
import { RON } from 'constants/tokens/ron';
import { Wron, Wron__factory } from 'contracts';
import { ContractTransaction } from 'ethers';
import { checkIsInsufficientRonBalance } from 'functions/utils';
import { WalletInfo } from 'types/wallet';
import { getContract } from 'utils/contract';
import tryParseCurrencyAmount from 'utils/try-parse-currency-amount';

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

  return wronContract.withdraw(`0x${parsedAmount.quotient.toString(16)}`);
};

export { unwrapRon };
