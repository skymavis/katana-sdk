import { ChainId } from '@sky-mavis/katana-core';
import { BigNumber, Contract, ethers, Signer } from 'ethers';
import { FunctionFragment, Interface, Result } from 'ethers/lib/utils';

import { MULTICALL2_ADDRESSES } from '../constants/address';
import { Multicall2, Multicall2__factory } from '../contracts';
import { CallInput, CallResult, CallState, MethodArg, MethodArgs, OptionalMethodInputs } from '../types/multicall';

const INVALID_CALL_STATE: CallState = { valid: false, result: undefined, error: false };

const toCallState = (callResult: CallResult, contractInterface: Interface, fragment: FunctionFragment): CallState => {
  const { valid, data } = callResult;
  if (!valid) return INVALID_CALL_STATE;
  const success = data && data.length > 2;
  let result: Result | undefined = undefined;
  if (success && data) {
    try {
      result = contractInterface.decodeFunctionResult(fragment, data);
    } catch (error) {
      console.debug('Result data parsing failed', fragment, data);
      return {
        valid: true,
        result,
        error: true,
      };
    }
  }
  return {
    valid: true,
    result: result,
    error: !success,
  };
};

const isMethodArg = (x: unknown): x is MethodArg => {
  return BigNumber.isBigNumber(x) || ['string', 'number'].indexOf(typeof x) !== -1;
};

const isValidMethodArgs = (x: unknown): x is MethodArgs | undefined => {
  return (
    x === undefined ||
    (Array.isArray(x) && x.every(xi => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
  );
};

const singleContractMultipleData = async (props: {
  contract: Contract;
  methodName: string;
  callInputs: OptionalMethodInputs[];
  chainId: ChainId;
  signerOrProvider?: Signer | ethers.providers.Provider;
}) => {
  const { contract, methodName, chainId, callInputs, signerOrProvider } = props;

  const multicallContract = new ethers.Contract(
    MULTICALL2_ADDRESSES[chainId],
    Multicall2__factory.createInterface(),
    signerOrProvider,
  ) as Multicall2;

  const fragment = contract?.interface?.getFunction(methodName);
  const calls =
    contract && fragment && callInputs?.length > 0
      ? callInputs.map<CallInput>(inputs => {
          return {
            address: contract.address,
            callData: contract.interface.encodeFunctionData(fragment, inputs),
          };
        })
      : [];
  const { returnData } = await multicallContract.callStatic.tryBlockAndAggregate(
    false,
    calls.map(obj => ({ target: obj.address, callData: obj.callData })),
  );

  const results: CallResult[] = returnData.map(({ success, returnData }: Multicall2.ResultStructOutput) => ({
    valid: success,
    data: returnData,
  }));

  return results.map(result => toCallState(result, contract?.interface, fragment));
};

const multipleContractSingleData = async (props: {
  addresses: string[];
  contractInterface: Interface;
  methodName: string;
  chainId: ChainId;
  signerOrProvider: any;
  callInputs?: OptionalMethodInputs;
}) => {
  const { addresses, contractInterface, methodName, chainId, callInputs, signerOrProvider } = props;

  const multicallContract = new ethers.Contract(
    MULTICALL2_ADDRESSES[chainId],
    Multicall2__factory.createInterface(),
    signerOrProvider,
  ) as Multicall2;

  const fragment = contractInterface.getFunction(methodName);
  const callData =
    fragment && isValidMethodArgs(callInputs) ? contractInterface.encodeFunctionData(fragment, callInputs) : undefined;

  const calls =
    fragment && addresses && addresses.length > 0 && callData
      ? addresses.map<CallInput>(address => {
          return {
            address,
            callData,
          };
        })
      : [];

  const { returnData } = await multicallContract.callStatic.tryBlockAndAggregate(
    false,
    calls.map(obj => ({ target: obj.address, callData: obj.callData })),
  );

  const results: CallResult[] = returnData.map(({ success, returnData }: Multicall2.ResultStructOutput) => ({
    valid: success,
    data: returnData,
  }));

  return results.map(result => toCallState(result, contractInterface, fragment));
};

export { multipleContractSingleData, singleContractMultipleData };
