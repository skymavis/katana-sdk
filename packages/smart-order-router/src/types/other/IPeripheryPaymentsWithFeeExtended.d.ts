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
  PayableOverrides,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import type { TypedEventFilter, TypedEvent, TypedListener } from './common';

interface IPeripheryPaymentsWithFeeExtendedInterface
  extends ethers.utils.Interface {
  functions: {
    'pull(address,uint256)': FunctionFragment;
    'refundETH()': FunctionFragment;
    'sweepToken(address,uint256,address)': FunctionFragment;
    'sweepTokenWithFee(address,uint256,uint256,address)': FunctionFragment;
    'unwrapWETH9(uint256,address)': FunctionFragment;
    'unwrapWETH9WithFee(uint256,address,uint256,address)': FunctionFragment;
    'wrapETH(uint256)': FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: 'pull',
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: 'refundETH', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'sweepToken',
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'sweepTokenWithFee',
    values: [string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'unwrapWETH9',
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'unwrapWETH9WithFee',
    values: [BigNumberish, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: 'wrapETH',
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: 'pull', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'refundETH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'sweepToken', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'sweepTokenWithFee',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'unwrapWETH9',
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: 'unwrapWETH9WithFee',
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: 'wrapETH', data: BytesLike): Result;

  events: {};
}

export class IPeripheryPaymentsWithFeeExtended extends BaseContract {
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

  interface: IPeripheryPaymentsWithFeeExtendedInterface;

  functions: {
    pull(
      token: string,
      value: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'sweepToken(address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'sweepToken(address,uint256)'(
      token: string,
      amountMinimum: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'sweepTokenWithFee(address,uint256,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'sweepTokenWithFee(address,uint256,address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'unwrapWETH9(uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'unwrapWETH9(uint256)'(
      amountMinimum: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'unwrapWETH9WithFee(uint256,address,uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    'unwrapWETH9WithFee(uint256,uint256,address)'(
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    wrapETH(
      value: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  pull(
    token: string,
    value: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  refundETH(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'sweepToken(address,uint256,address)'(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'sweepToken(address,uint256)'(
    token: string,
    amountMinimum: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'sweepTokenWithFee(address,uint256,uint256,address)'(
    token: string,
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'sweepTokenWithFee(address,uint256,address,uint256,address)'(
    token: string,
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'unwrapWETH9(uint256,address)'(
    amountMinimum: BigNumberish,
    recipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'unwrapWETH9(uint256)'(
    amountMinimum: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'unwrapWETH9WithFee(uint256,address,uint256,address)'(
    amountMinimum: BigNumberish,
    recipient: string,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  'unwrapWETH9WithFee(uint256,uint256,address)'(
    amountMinimum: BigNumberish,
    feeBips: BigNumberish,
    feeRecipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  wrapETH(
    value: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    pull(
      token: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    refundETH(overrides?: CallOverrides): Promise<void>;

    'sweepToken(address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    'sweepToken(address,uint256)'(
      token: string,
      amountMinimum: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    'sweepTokenWithFee(address,uint256,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    'sweepTokenWithFee(address,uint256,address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    'unwrapWETH9(uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    'unwrapWETH9(uint256)'(
      amountMinimum: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    'unwrapWETH9WithFee(uint256,address,uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    'unwrapWETH9WithFee(uint256,uint256,address)'(
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    wrapETH(value: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    pull(
      token: string,
      value: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'sweepToken(address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'sweepToken(address,uint256)'(
      token: string,
      amountMinimum: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'sweepTokenWithFee(address,uint256,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'sweepTokenWithFee(address,uint256,address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'unwrapWETH9(uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'unwrapWETH9(uint256)'(
      amountMinimum: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'unwrapWETH9WithFee(uint256,address,uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    'unwrapWETH9WithFee(uint256,uint256,address)'(
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    wrapETH(
      value: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    pull(
      token: string,
      value: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'sweepToken(address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'sweepToken(address,uint256)'(
      token: string,
      amountMinimum: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'sweepTokenWithFee(address,uint256,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'sweepTokenWithFee(address,uint256,address,uint256,address)'(
      token: string,
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'unwrapWETH9(uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'unwrapWETH9(uint256)'(
      amountMinimum: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'unwrapWETH9WithFee(uint256,address,uint256,address)'(
      amountMinimum: BigNumberish,
      recipient: string,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    'unwrapWETH9WithFee(uint256,uint256,address)'(
      amountMinimum: BigNumberish,
      feeBips: BigNumberish,
      feeRecipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    wrapETH(
      value: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
