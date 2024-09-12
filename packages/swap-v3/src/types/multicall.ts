import { BigNumber } from 'ethers';

type Result = ReadonlyArray<any> & {
  readonly [key: string]: any;
};

type MethodArg = string | number | BigNumber;
type MethodArgs = Array<MethodArg | MethodArg[]>;

type CallInput = {
  address: string;
  callData: string;
  gasRequired?: number;
};

type CallResult = {
  readonly valid: boolean;
  readonly data: string | undefined;
};

type CallState = {
  readonly valid: boolean;
  readonly result: Result | undefined;
  readonly error: boolean;
};

type OptionalMethodInputs = Array<MethodArg | MethodArg[] | undefined> | undefined;

export type { CallInput, CallResult, CallState, MethodArg, MethodArgs, OptionalMethodInputs, Result };
