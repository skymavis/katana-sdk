import { ChainId } from 'configs/chain';

import { WalletInfo } from './wallet';

type CommonApproveTokenArgs = {
  tokenAddress: string;
  owner: string;
  chainId: ChainId;
  spender?: string;
};

type CheckIsTokenApprovedArgs = CommonApproveTokenArgs & {
  amount: string;
};

type GetTokenAllowanceArgs = CommonApproveTokenArgs;

type ApproveTokenArgs = Omit<CommonApproveTokenArgs, 'owner'> & {
  wallet: WalletInfo;
  amount?: string;
};

export type { ApproveTokenArgs, CheckIsTokenApprovedArgs, GetTokenAllowanceArgs };
