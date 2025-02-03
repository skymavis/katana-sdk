import { JsonRpcSigner, Provider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { BaseContract, Contract, ContractInterface } from 'ethers';

import { ZERO_ADDRESS } from '../constants/misc';
import { checkAddress } from './address';

const getProviderOrSigner = (
  provider: Web3Provider | StaticJsonRpcProvider,
  account?: string,
): Provider | JsonRpcSigner => {
  return account ? provider.getSigner(account) : provider;
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
  const signer = getProviderOrSigner(provider, account);
  return new Contract(address, ABI, signer) as T;
};

export { getContract };
