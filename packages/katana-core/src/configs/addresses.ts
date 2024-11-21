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
  v3CoreFactoryAddress: '0x1f0B70d9A137e3cAEF0ceAcD312BC5f81Da0cC0c',
  multicallAddress: '0x48365CcA8769c926ffbFE5B43f0e360363e8ee70',
  quoterAddress: '0x84Ab2f9Fdc4Bf66312b0819D879437b8749EfDf2',
  v3MigratorAddress: '0x0124c9Ce7E77eD166f6d53AF679B491555b5C0F7',
  nonfungiblePositionManagerAddress: '0x7cF0fb64d72b733695d77d197c664e90D07cF45A',
  tickLensAddress: '0x05Ad77F1e419Dac0B580a2Ca08CB1e3e33F946Ee',
  swapRouter02Address: '0xC05AFC8c9353c1dd5f872EcCFaCD60fd5A2a9aC7',
  mixedRouteQuoterV1Address: '0xebdC1bb4DF7627573A480bBEEB30e8919d21BC90',
  permit2Address: '0x771CA29e483Df5447E20a89e0F00E1DAF09eF534',
  universalRouterAddress: '0x5F0aCDD3eC767514fF1BF7e79949640bf94576BD',
};

const RONIN_TESTNET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x4E7236ff45d69395DDEFE1445040A8f3C7CD8819',
  multicallAddress: '0x5938EF96F0C7c75CED7132D083ff08362C7FF70a',
  quoterAddress: '0x953368BB464010A5E24f8c3da79C3EC5C0073568',
  v3MigratorAddress: '0x8cF4743642acF849eff54873e24d46D0f3437593',
  nonfungiblePositionManagerAddress: '0x7C2716803c09cd5eeD78Ba40117084af3c803565',
  tickLensAddress: '0x812F9B77473D8847767cfFF087B49b628458fc65',
  swapRouter02Address: '0x3BD36748D17e322cFB63417B059Bcc1059012D83',
  mixedRouteQuoterV1Address: '0x7eA0900b2F3aA0859BDB826B4009C9195C85A016',
  permit2Address: '0xCcf4a457E775f317e0Cf306EFDda14Cc8084F82C',
  universalRouterAddress: '0x2A50959B27387b4452198d7783A3d353858563a4',
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
    return CHAIN_TO_ADDRESSES_MAP[id].swapRouter02Address;
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
