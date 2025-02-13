/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers';
import { Provider } from '@ethersproject/providers';
import type {
  TokenFeeDetector,
  TokenFeeDetectorInterface,
} from '../TokenFeeDetector';

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_factoryV2',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'PairLookupFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'SameToken',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]',
      },
      {
        internalType: 'address',
        name: 'baseToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountToBorrow',
        type: 'uint256',
      },
    ],
    name: 'batchValidate',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyFeeBps',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellFeeBps',
            type: 'uint256',
          },
        ],
        internalType: 'struct TokenFees[]',
        name: 'fotResults',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount0',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'uniswapV2Call',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'baseToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amountToBorrow',
        type: 'uint256',
      },
    ],
    name: 'validate',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyFeeBps',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellFeeBps',
            type: 'uint256',
          },
        ],
        internalType: 'struct TokenFees',
        name: 'fotResult',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export class TokenFeeDetector__factory {
  static readonly abi = _abi;
  static createInterface(): TokenFeeDetectorInterface {
    return new utils.Interface(_abi) as TokenFeeDetectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenFeeDetector {
    return new Contract(address, _abi, signerOrProvider) as TokenFeeDetector;
  }
}
