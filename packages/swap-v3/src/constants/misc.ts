import { Percent } from '@axieinfinity/sdk-core';

const AVERAGE_RONIN_L1_BLOCK_TIME = 3000; // 3 seconds in milliseconds

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const SWAP_DEFAULT_SLIPPAGE = new Percent(50, 10_000); // .50%

const BIPS_BASE = 10_000;

export { AVERAGE_RONIN_L1_BLOCK_TIME, BIPS_BASE, SWAP_DEFAULT_SLIPPAGE, ZERO_ADDRESS };
