import { ChainId } from '@sky-mavis/katana-core';
import { PermitSingle } from '@uniswap/permit2-sdk';
import { BigNumber } from 'ethers';

import { WalletInfo } from './wallet';

type CreatePermitArgs = {
  chainId: ChainId;
  token: string;
  nonce: number;
  spender?: string;
  amount?: BigNumber;
  expiration?: number;
  sigDeadline?: number;
};

type GetPermitAllowanceArgs = {
  tokenAddress: string;
  owner: string;
  chainId: ChainId;
  spender?: string;
};

type Permit = Omit<PermitSingle, 'sigDeadline'> & {
  sigDeadline: number;
};

type PermitSignature = Permit & {
  signature: string;
};

type SignPermitAllowanceArgs = {
  wallet: WalletInfo;
  permit: Permit;
  chainId: ChainId;
};

type CheckIsValidPermitAllowanceSignatureArgs = {
  chainId: ChainId;
  token: string;
  signature: PermitSignature | undefined;
  now: number;
  spender?: string;
};

type CheckIsValidPermitAllowanceArgs = {
  permitAllowance: BigNumber | undefined;
  permitExpiration: number | undefined;
  amount: BigNumber;
  now: number;
};

export type {
  CheckIsValidPermitAllowanceArgs,
  CheckIsValidPermitAllowanceSignatureArgs,
  CreatePermitArgs,
  GetPermitAllowanceArgs,
  Permit,
  PermitSignature,
  SignPermitAllowanceArgs,
};
