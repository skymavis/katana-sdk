import { ChainId, SUPPORTED_CHAINS } from './chain';

export type IAddressMap = { [chainId: number]: string };

type ChainAddresses = {
  v3CoreFactoryAddress: string;
  multicallAddress: string;
  quoterAddress: string;
  v3MigratorAddress: string;
  nonfungiblePositionManagerAddress: string;
  tickLensAddress: string;
  swapRouter02Address?: string;
  mixedRouteQuoterV1Address: string;
  universalRouterAddress: string;
  permit2Address: string;
};

export const V2_FACTORY_ADDRESSES: IAddressMap = {
  [ChainId.mainnet]: '0xb255d6a720bb7c39fee173ce22113397119cb930',
  [ChainId.testnet]: '0x86587380c4c815ba0066c90adb2b45cc9c15e72c',
};

export const PERMISSIONED_ROUTER_ADDRESS: IAddressMap = {
  [ChainId.mainnet]: '0xc05afc8c9353c1dd5f872eccfacd60fd5a2a9ac7',
  [ChainId.testnet]: '0x3BD36748D17e322cFB63417B059Bcc1059012D83',
};

export const AFFILIATE_ROUTER_ADDRESS: IAddressMap = {
  [ChainId.mainnet]: '0x77f96cf7b98b963fb8a9b84787806d396d953b2b',
  [ChainId.testnet]: '0x4a913d50e618ee9f61ffa288d8f8040d489d2360',
};

export const KATANA_GOVERNANCE_ADDRESSES: IAddressMap = {
  [ChainId.mainnet]: '0x2c1726346d83cbf848bd3c2b208ec70d32a9e44a',
  [ChainId.testnet]: '0x247f12836a421cdc5e22b93bf5a9aaa0f521f986',
};

// tdb
const RONIN_MAINNET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '',
  multicallAddress: '',
  quoterAddress: '',
  v3MigratorAddress: '',
  nonfungiblePositionManagerAddress: '',
  tickLensAddress: '',
  swapRouter02Address: '',
  mixedRouteQuoterV1Address: '',
  permit2Address: '',
  universalRouterAddress: '',
};

const RONIN_TESTNET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x4E7236ff45d69395DDEFE1445040A8f3C7CD8819',
  multicallAddress: '0x5938EF96F0C7c75CED7132D083ff08362C7FF70a',
  quoterAddress: '0xB2Cc117Ed42cBE07710C90903bE46D2822bcde45',
  v3MigratorAddress: '0x8cF4743642acF849eff54873e24d46D0f3437593',
  nonfungiblePositionManagerAddress: '0x7C2716803c09cd5eeD78Ba40117084af3c803565',
  tickLensAddress: '0x812F9B77473D8847767cfFF087B49b628458fc65',
  swapRouter02Address: '0x5e0549354606efc1de33ea618d2183d81c62c193',
  mixedRouteQuoterV1Address: '0x9FC1eaBd6C8fCFbd2c43c3641DC612Ffa61fcACd',
  permit2Address: '0xCcf4a457E775f317e0Cf306EFDda14Cc8084F82C',
  universalRouterAddress: '0x8Cd8F15E956636e6527d2EC2ea669675A74153CF',
};

export const CHAIN_TO_ADDRESSES_MAP: Record<ChainId, ChainAddresses> = {
  [ChainId.mainnet]: RONIN_MAINNET_ADDRESSES,
  [ChainId.testnet]: RONIN_TESTNET_ADDRESSES,
};

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: IAddressMap = {
  ...SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
    memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].v3CoreFactoryAddress;
    return memo;
  }, {}),
};

export const V3_MIGRATOR_ADDRESSES: IAddressMap = {
  ...SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
    const v3MigratorAddress = CHAIN_TO_ADDRESSES_MAP[chainId].v3MigratorAddress;
    if (v3MigratorAddress) {
      memo[chainId] = v3MigratorAddress;
    }
    return memo;
  }, {}),
};

export const MULTICALL_ADDRESSES: IAddressMap = {
  ...SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
    memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].multicallAddress;
    return memo;
  }, {}),
};

export const QUOTER_ADDRESSES: IAddressMap = {
  ...SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
    memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].quoterAddress;
    return memo;
  }, {}),
};

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: IAddressMap = {
  ...SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
    const nonfungiblePositionManagerAddress = CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress;
    if (nonfungiblePositionManagerAddress) {
      memo[chainId] = nonfungiblePositionManagerAddress;
    }
    return memo;
  }, {}),
};

export const TICK_LENS_ADDRESSES: IAddressMap = {
  ...SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
    const tickLensAddress = CHAIN_TO_ADDRESSES_MAP[chainId].tickLensAddress;
    if (tickLensAddress) {
      memo[chainId] = tickLensAddress;
    }
    return memo;
  }, {}),
};

export const MIXED_ROUTE_QUOTER_V1_ADDRESSES: IAddressMap = SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
  const mixedRouteQuoterV1Address = CHAIN_TO_ADDRESSES_MAP[chainId].mixedRouteQuoterV1Address;
  if (mixedRouteQuoterV1Address) {
    memo[chainId] = mixedRouteQuoterV1Address;
  }
  return memo;
}, {});

export const SWAP_ROUTER_02_ADDRESSES = (chainId: number) => {
  if (SUPPORTED_CHAINS.includes(chainId)) {
    const id = chainId as ChainId;
    return CHAIN_TO_ADDRESSES_MAP[id].swapRouter02Address ?? '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
  }
  return '';
};

export const UNIVERSAL_ROUTER_ADDRESS: IAddressMap = SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
  const universalRouterAddress = CHAIN_TO_ADDRESSES_MAP[chainId].universalRouterAddress;
  if (universalRouterAddress) {
    memo[chainId] = universalRouterAddress;
  }
  return memo;
}, {});

export const PERMIT2_ADDRESS: IAddressMap = SUPPORTED_CHAINS.reduce<IAddressMap>((memo, chainId) => {
  const permit2Address = CHAIN_TO_ADDRESSES_MAP[chainId].permit2Address;
  if (permit2Address) {
    memo[chainId] = permit2Address;
  }
  return memo;
}, {});
