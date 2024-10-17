/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import type { TypedEventFilter, TypedEvent, TypedListener } from './common';

interface PairFlashInterface extends ethers.utils.Interface {
  functions: {
    'WETH9()': FunctionFragment;
    'factory()': FunctionFragment;
    'initFlash((address,address,uint24,uint256,uint256,uint24,uint24))': FunctionFragment;
    'refundETH()': FunctionFragment;
    'swapRouter()': FunctionFragment;
    'sweepToken(address,uint256,address)': FunctionFragment;
    'uniswapV3FlashCallback(uint256,uint256,bytes)': FunctionFragment;
    'unwrapWETH9(uint256,address)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'WETH9', values?: undefined): string;
  encodeFunctionData(functionFragment: 'factory', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'initFlash',
    values: [
      {
        token0: string;
        token1: string;
        fee1: BigNumberish;
        amount0: BigNumberish;
        amount1: BigNumberish;
        fee2: BigNumberish;
        fee3: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(functionFragment: 'refundETH', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'swapRouter',
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: 'sweepToken',
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'uniswapV3FlashCallback',
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: 'unwrapWETH9',
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: 'WETH9', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'factory', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initFlash', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'refundETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'swapRouter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sweepToken', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'uniswapV3FlashCallback',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'unwrapWETH9',
    data: BytesLike
  ): Result;

  events: {};
}

export class PairFlash extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: PairFlashInterface;

  functions: {
    WETH9(overrides?: CallOverrides): Promise<[string]>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    initFlash(
      params: {
        token0: string;
        token1: string;
        fee1: BigNumberish;
        amount0: BigNumberish;
        amount1: BigNumberish;
        fee2: BigNumberish;
        fee3: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapRouter(overrides?: CallOverrides): Promise<[string]>;

    sweepToken(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniswapV3FlashCallback(
      fee0: BigNumberish,
      fee1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unwrapWETH9(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  WETH9(overrides?: CallOverrides): Promise<string>;

  factory(overrides?: CallOverrides): Promise<string>;

  initFlash(
    params: {
      token0: string;
      token1: string;
      fee1: BigNumberish;
      amount0: BigNumberish;
      amount1: BigNumberish;
      fee2: BigNumberish;
      fee3: BigNumberish;
    },
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  refundETH(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapRouter(overrides?: CallOverrides): Promise<string>;

  sweepToken(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniswapV3FlashCallback(
    fee0: BigNumberish,
    fee1: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unwrapWETH9(
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH9(overrides?: CallOverrides): Promise<string>;

    factory(overrides?: CallOverrides): Promise<string>;

    initFlash(
      params: {
        token0: string;
        token1: string;
        fee1: BigNumberish;
        amount0: BigNumberish;
        amount1: BigNumberish;
        fee2: BigNumberish;
        fee3: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<void>;

    refundETH(overrides?: CallOverrides): Promise<void>;

    swapRouter(overrides?: CallOverrides): Promise<string>;

    sweepToken(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    uniswapV3FlashCallback(
      fee0: BigNumberish,
      fee1: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    unwrapWETH9(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    WETH9(overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    initFlash(
      params: {
        token0: string;
        token1: string;
        fee1: BigNumberish;
        amount0: BigNumberish;
        amount1: BigNumberish;
        fee2: BigNumberish;
        fee3: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapRouter(overrides?: CallOverrides): Promise<BigNumber>;

    sweepToken(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniswapV3FlashCallback(
      fee0: BigNumberish,
      fee1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unwrapWETH9(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH9(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initFlash(
      params: {
        token0: string;
        token1: string;
        fee1: BigNumberish;
        amount0: BigNumberish;
        amount1: BigNumberish;
        fee2: BigNumberish;
        fee3: BigNumberish;
      },
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sweepToken(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniswapV3FlashCallback(
      fee0: BigNumberish,
      fee1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unwrapWETH9(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
