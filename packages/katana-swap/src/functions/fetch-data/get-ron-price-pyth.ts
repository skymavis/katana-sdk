import { ChainId } from '@sky-mavis/katana-core';
import { PYTH_ADDRESSES } from 'constants/address';
import { PYTH_RON_ID } from 'constants/price';
import { Pyth, Pyth__factory } from 'contracts';
import { getContract } from 'utils/contract';
import { getRoninReadProvider } from 'utils/provider';

/**
 * Get RON price (USD) from Pyth
 * @param chainId - Network chain ID
 * @returns RON price (USD)
 */
const getRonPricePyth = async (chainId: ChainId): Promise<number> => {
  const contract = getContract<Pyth>({
    address: PYTH_ADDRESSES[chainId],
    ABI: Pyth__factory.createInterface(),
    provider: getRoninReadProvider(chainId),
  });

  if (!contract) {
    throw new Error('Cannot get Pyth contract');
  }

  const RONToUSDPrice = await contract.getPrice(PYTH_RON_ID[chainId]);
  return parseFloat(RONToUSDPrice.price.toString()) * Math.pow(10, RONToUSDPrice.expo);
};

export { getRonPricePyth };
