import { ChainId } from '@sky-mavis/katana-core';
import { ethers } from 'ethers';

import { RPC_URL } from '../configs/rpc';

const getRoninReadProvider = (chainId: ChainId) => new ethers.providers.StaticJsonRpcProvider(RPC_URL[chainId]);

export { getRoninReadProvider };
