/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type {
  GasDataArbitrum,
  GasDataArbitrumInterface,
} from '../GasDataArbitrum';

const _abi = [
  {
    inputs: [],
    name: 'getPricesInWei',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export class GasDataArbitrum__factory {
  static readonly abi = _abi;
  static createInterface(): GasDataArbitrumInterface {
    return new utils.Interface(_abi) as GasDataArbitrumInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GasDataArbitrum {
    return new Contract(address, _abi, signerOrProvider) as GasDataArbitrum;
  }
}
