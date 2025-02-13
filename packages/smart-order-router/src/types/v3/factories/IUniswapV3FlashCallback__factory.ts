/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type {
  IUniswapV3FlashCallback,
  IUniswapV3FlashCallbackInterface,
} from '../IUniswapV3FlashCallback';

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'fee0',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fee1',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'uniswapV3FlashCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export class IUniswapV3FlashCallback__factory {
  static readonly abi = _abi;
  static createInterface(): IUniswapV3FlashCallbackInterface {
    return new utils.Interface(_abi) as IUniswapV3FlashCallbackInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUniswapV3FlashCallback {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IUniswapV3FlashCallback;
  }
}
