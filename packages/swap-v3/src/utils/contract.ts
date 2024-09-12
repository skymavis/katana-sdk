import { AddressZero } from '@ethersproject/constants';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcSigner, Provider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';

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

const getContract = ({ address, ABI, provider, account }: GetContractArgs): Contract | null => {
  if (!checkAddress(address) || address === AddressZero) {
    return null;
  }

  return new Contract(
    address,
    ABI,
    provider instanceof Web3Provider ? getProviderOrSigner(provider, account) : provider,
  );
};

export { getContract };
