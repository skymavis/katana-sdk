import { ChainId } from '../../configs/chain';
import { AXS, BANANA, BERRY, PIXEL, SLP, USDC, WETH, WRON } from './mainnet';
import {
  AXS_TESTNET,
  BANANA_TESTNET,
  BERRY_TESTNET,
  PIXEL_TESTNET,
  SLP_TESTNET,
  USDC_TESTNET,
  WETH_TESTNET,
  WRON_TESTNET,
} from './testnet';

const DEFAULT_ERC20 = {
  [ChainId.mainnet]: {
    WRON: WRON,
    AXS,
    SLP,
    WETH,
    USDC,
    BERRY,
    PIXEL,
    BANANA,
  },
  [ChainId.testnet]: {
    WRON: WRON_TESTNET,
    AXS: AXS_TESTNET,
    SLP: SLP_TESTNET,
    WETH: WETH_TESTNET,
    USDC: USDC_TESTNET,
    BERRY: BERRY_TESTNET,
    PIXEL: PIXEL_TESTNET,
    BANANA: BANANA_TESTNET,
  },
};

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
const DEFAULT_ERC20_DECIMALS = 18;

export { DEFAULT_ERC20, DEFAULT_ERC20_DECIMALS };
