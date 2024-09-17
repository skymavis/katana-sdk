import { ChainId } from 'configs/chain';
import { RPC_URL } from 'configs/rpc';
import { ethers } from 'ethers';

const getRoninReadProvider = (chainId: ChainId) => new ethers.providers.StaticJsonRpcProvider(RPC_URL[chainId]);

export { getRoninReadProvider };
