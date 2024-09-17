import { PermitSingle } from '@uniswap/permit2-sdk';
import { ChainId } from 'configs/chain';
import { BigNumber } from 'ethers';

import { WalletInfo } from './wallet';

type CreatePermitArgs = {
  token: string;
  spender: string;
  nonce: number;
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

type CheckIsSignedPermitAllowanceArgs = {
  token: string;
  signature: PermitSignature;
  spender: string;
  now: number;
};

type CheckIsValidPermitAllowanceArgs = {
  permitAllowance: BigNumber;
  amount: BigNumber;
  permitExpiration: number;
  now: number;
};

export type {
  CheckIsSignedPermitAllowanceArgs,
  CheckIsValidPermitAllowanceArgs,
  CreatePermitArgs,
  GetPermitAllowanceArgs,
  Permit,
  PermitSignature,
  SignPermitAllowanceArgs,
};
