import { ChainId } from '@sky-mavis/katana-core';
import { RPC_URL } from 'configs/rpc';
import { ethers } from 'ethers';

const getRoninReadProvider = (chainId: ChainId) => new ethers.providers.StaticJsonRpcProvider(RPC_URL[chainId]);

export { getRoninReadProvider };
