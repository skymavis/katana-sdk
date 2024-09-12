import { Web3Provider } from '@ethersproject/providers';

type WalletInfo = {
  account: string;
  provider: Web3Provider;
};

export type { WalletInfo };
