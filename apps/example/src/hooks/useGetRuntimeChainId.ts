import { SupportedChainIds } from '@roninnetwork/walletgo';
import getConfig from 'next/config';

export const useGetRuntimeChainId = () => {
  const { publicRuntimeConfig } = getConfig();
  const { chainId } = publicRuntimeConfig;
  return parseInt(chainId ?? SupportedChainIds.RoninMainet);
};
