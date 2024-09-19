import { JsonRpcSigner, Provider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { ZERO_ADDRESS } from 'constants/misc';
import { BaseContract, Contract, ContractInterface } from 'ethers';

import { checkAddress } from './address';

const getProviderOrSigner = (provider: Web3Provider, account?: string): Provider | JsonRpcSigner => {
  return account ? provider.getSigner(account).connectUnchecked() : provider;
};

type GetContractArgs = {
  address: string;
  ABI: ContractInterface;
  provider: Web3Provider | StaticJsonRpcProvider;
  account?: string;
};

const getContract = <T extends BaseContract>({ address, ABI, provider, account }: GetContractArgs): T | null => {
  if (!checkAddress(address) || address === ZERO_ADDRESS) {
    return null;
  }

  return new Contract(
    address,
    ABI,
    provider instanceof Web3Provider ? getProviderOrSigner(provider, account) : provider,
  ) as T;
};

export { getContract };
