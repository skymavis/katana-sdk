import { Percent } from '@axieinfinity/sdk-core';

const AVERAGE_RONIN_L1_BLOCK_TIME = 3000; // 3 seconds in milliseconds

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const DEFAULT_SWAP_SLIPPAGE = new Percent(50, 10_000); // .50%
const DEFAULT_TX_DEADLINE = 60 * 30; // 30 minutes, denominated in seconds

const BIPS_BASE = 10_000;

export { AVERAGE_RONIN_L1_BLOCK_TIME, BIPS_BASE, DEFAULT_SWAP_SLIPPAGE, DEFAULT_TX_DEADLINE, ZERO_ADDRESS };
