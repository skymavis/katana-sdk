import { ChainId } from './chain';

const KATANA_V2_INIT_CODE_HASH: Record<ChainId, string> = {
  [ChainId.mainnet]: '0xe85772d2fe4ad93037659afaee57751696456eb5dd99987e43f3cf11c6e255a2',
  [ChainId.testnet]: '0x1cc97ead4d6949b7a6ecb28652b21159b9fd5608ae51a1960224099caab07dca',
};

const KATANA_V3_INIT_CODE_HASH: Record<ChainId, string> = {
  [ChainId.mainnet]: '0xb381dabeb6037396a764deb39e57a4a3f75b641ce3e9944b1e4b18d036e322e1',
  [ChainId.testnet]: '0xb381dabeb6037396a764deb39e57a4a3f75b641ce3e9944b1e4b18d036e322e1',
};

export { KATANA_V2_INIT_CODE_HASH, KATANA_V3_INIT_CODE_HASH };
