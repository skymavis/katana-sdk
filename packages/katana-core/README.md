# Katana Core SDK

## Overview
The Katana Core SDK enables developers to easily integrate token swapping functionality into their applications on the Ronin blockchain. This SDK provides all the necessary tools to interact with Katana's decentralized exchange features, allowing seamless ERC20 token swaps.

## Quickstart/Playground
[Playground](/apps/example/): tbd

## Installation

With yarn

```bash
 yarn add @sky-mavis/katana-core
```

With npm

```bash
 npm install @sky-mavis/katana-core --save
```

## Usage examples

### Fetch data

#### Tokens

##### _Get all tokens_

```typescript
import { ChainId, getAllTokens, DEFAULT_ERC20 } from '@sky-mavis/katana-core';

const allPublicTokens = await getAllTokens(ChainId.mainnet);
const { mapTokens, arrTokens, arrTokenAddresses } = allPublicTokens

const tokenAddress = "0x97a9107c1793bc407d6f527b77e7fff4d812bece" // AXS
const AXS_TOKEN = mapTokens[tokenAddress]

// or get token from list default erc20 (only for some popular erc20 tokens)
const AXS_TOKEN = DEFAULT_ERC20[ChainId.mainnet].AXS
```

#### Balance

##### _Get Ron balance_

```typescript
import { ChainId, getRonBalance } from '@sky-mavis/katana-core';

const params = {
    chainId: ChainId.mainnet,
    account: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c" // Your account
}

const ronBalance: BigNumber = await getRonBalance(params);
```

##### _Get ERC20 tokens' balance_

```typescript
import { ChainId, getTokenBalances } from '@sky-mavis/katana-core';

const AXSAddress = 
const params = {
    chainId: ChainId.mainnet,
    account: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c" // Your account
    tokens: [DEFAULT_ERC20[ChainId.mainnet].AXS.address, DEFAULT_ERC20[ChainId.mainnet].WRON.address]
}

const tokenBalances: { [tokenAddress: string]: BigNumber | null } = await getTokenBalances(params);
const AXSBalance = tokenBalances[DEFAULT_ERC20[ChainId.mainnet].AXS.address]
const WRONBalance = tokenBalances[DEFAULT_ERC20[ChainId.mainnet].WRON.address]
```

#### Approval for Swap

##### _Get permit allowance_

```typescript
import { ChainId, getPermitAllowance } from '@sky-mavis/katana-core';

const params = {
    chainId: ChainId.mainnet,
    tokenAddress: DEFAULT_ERC20[ChainId.mainnet].AXS.address,
    owner: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c" // Your account
}

const { amount, expiration, nonce } = await getPermitAllowance(params);
```

##### _Get token allowance_

```typescript
import { ChainId, getTokenAllowance } from '@sky-mavis/katana-core';

const params = {
    chainId: ChainId.mainnet,
    tokenAddress: DEFAULT_ERC20[ChainId.mainnet].AXS.address,
    owner: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c" // Your account
}

const allowance: BigNumber = await getTokenAllowance(params);
```

#### RON Price USD

##### _Get usd price of RON from Pyth contract_

```typescript
import { ChainId, getRonPricePyth } from '@sky-mavis/katana-core';

const ronPriceUSD: number = await getRonPricePyth(ChainId.mainnet);
```

#### Trade

##### _Get best trade_

```typescript
import { ChainId, getBestTrade, TradeType, KatanaTrade } from '@sky-mavis/katana-core';

const params = {
    chainId: ChainId.mainnet,
    tokenInAddress: DEFAULT_ERC20[ChainId.mainnet].AXS.address,
    tokenOutAddress: DEFAULT_ERC20[ChainId.mainnet].WRON.address,
    tradeType: TradeType.EXACT_INPUT,
    amount: "1000000000000000000" // 1 AXS
}

const trade: KatanaTrade = await getBestTrade(params);
```

#### _Get token price on Katana_

```typescript
import { ChainId, getTokenPrice, quoteTokenPrice } from '@sky-mavis/katana-core';

const params = {
    chainId: ChainId.mainnet,
    tokenAddress: DEFAULT_ERC20[ChainId.mainnet].AXS.address,
}

const price = await getTokenPrice(params);
const ronPriceUSD: number = await getRonPricePyth(ChainId.mainnet);

const params = {
    tokenPrice: price,
    ronPriceUSDFromPyth: ronPriceUSD,
    amount: '20' // 20 AXS token
}
const usdQuotePrice: number | null = quoteTokenPrice(params)
```

### Main actions

#### Approval

##### _Approve token_

import { ChainId, approveToken } from '@sky-mavis/katana-core';
```typescript

const wallet = createWalletClient()
const params = {
    chainId: ChainId.mainnet,
    tokenAddress: DEFAULT_ERC20[ChainId.mainnet].AXS.address,
    wallet,
}
const tx: ContractTransaction = await approveToken(params);

```

##### _Sign permit allowance_

```typescript
import { ChainId, signPermitAllowance, createPermitObj, getPermitAllowance } from '@sky-mavis/katana-core';


const wallet = createWalletClient()

const tokenAddress = DEFAULT_ERC20[ChainId.mainnet].AXS.address;

const { nonce } = await getPermitAllowance({
    chainId: ChainId.mainnet,
    tokenAddress,
    owner: wallet.account,
});

const params = {
    chainId: ChainId.mainnet,
    wallet,
    permit: createPermitObj({
        chainId: ChainId.mainnet,
        token: tokenAddress,
        nonce
    })
}

const permitSignature = await signPermitAllowance(params);
```

##### _Swap_

```typescript
import { 
    ChainId, 
    swap, 
    DEFAULT_ERC20, 
    SwapRouterNativeAssets, 
    getBestTrade, 
    getRonBalance, 
    checkIsInsufficientRonBalance,
    checkIsInsufficientBalance,
    checkIsTokenApproved,
    approveToken,
    getIntervalTimeCheckPermit,
    checkIsValidPermitAllowanceSignature,
    checkIsValidPermitAllowance,
    createPermitObj,
    signPermitAllowance
} from '@sky-mavis/katana-core';

const chainId = ChainId.mainnet;
const tokenInAddress = DEFAULT_ERC20[chainId].AXS.address;
const tokenOutAddress =  SwapRouterNativeAssets.RON;
const amount = '1000000000000000000';
const tradeType = TradeType.EXACT_INPUT;
const wallet = createWalletClient()

// find best trade
const findBestTradeParams {
    chainId,
    tokenInAddress,
    tokenOutAddress,
    amount,
    tradeType
}
const trade = await getBestTrade(findBestTradeParams)

// get balance
const { ronBalance, isInsufficient: isInsufficientRONBalance } = await checkIsInsufficientRonBalance({
    chainId,
    account: wallet.account,
    amount,
});

const { tokenBalance: axsBalance, isInsufficient: isInsufficientTokenBalance } = await checkIsInsufficientBalance({
    chainId,
    account: wallet.account,
    token
    amount,
});

// approve token
const { allowance, isApproved } = await checkIsTokenApproved({
    chainId,
    tokenAddress: tokenInAddress,
    owner: wallet.account,
    amount,
})

const txApproved = await approveToken({
    chainId,
    tokenAddress: tokenInAddress,
    wallet,
})

// permit allowance
const { amount: permitAllowance, expiration: permitExpiration, nonce } = await getPermitAllowance({
    chainId: ChainId.mainnet,
    tokenAddress,
    owner: wallet.account,
});

// Signature and PermitAllowance will expire, so they should be rechecked at an interval.
const currentTime = getIntervalTimeCheckPermit()

const isValidPermitAllowance = checkIsValidPermitAllowance({
    permitAllowance,
    permitExpiration,
    amount,
    now: currentTime
})

let permitSignature = undefined; // local state

const isValidSignature = checkIsValidPermitAllowanceSignature({
    chainId,
    token: tokenInAddress,
    signature: permitSignature,
    now: currentTime
})

const shouldRequestSignature = !(isValidPermitAllowance || isValidSignature);

// should request signature 
if (shouldRequestSignature) {
    permitSignature = await signPermitAllowance({
        chainId,
        wallet,
        permit: createPermitObj({
            chainId: ChainId.mainnet,
            token: tokenAddress,
            nonce
        })
    })
}

// swap (only when !shouldRequestSignature && isApproved)
const swapParams = {
    chainId: ChainId.mainnet,
    wallet,
    trade,
    permitSignature
}

const txReceipt = await swap(swapParams);
```
##### _Wrap RON, unwrap RON_

``` typescript
import { ChainId, wrapRon, unwrapRon } from '@sky-mavis/katana-core';

const wallet = createWalletClient();

// wrap RON
const params = {
    chainId: ChainId.mainnet,
    wallet,
    amount: '10',
};
const tx = await wrapRon(params);

// unwrap RON
const params = {
    chainId: ChainId.mainnet,
    wallet,
    amount: '10',
};
const tx = await unwrapRon(params);
```

### Utilities functions

#### _Create wallet client_

```typescript
import { ChainId } from '@sky-mavis/katana-core';

const createWalletClient = () => {
  const provider = new ethers.providers.Web3Provider(window.ronin.provider);

  return {
    account: '0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c',
    provider
  };
};
```

#### Approval

##### _Check is token approved_

```typescript
import { ChainId, checkIsTokenApproved, DEFAULT_ERC20 } from '@sky-mavis/katana-core';

const { allowance, isApproved } = await checkIsTokenApproved({
    chainId,
    tokenAddress: DEFAULT_ERC20[chainId].AXS.address,
    owner: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c",
    amount: "1000000000000000000",
})
```

##### _Check is valid permit allowance signature_

```typescript
import { ChainId, checkIsValidPermitAllowanceSignature, DEFAULT_ERC20 } from '@sky-mavis/katana-core';

const currentTime = getIntervalTimeCheckPermit()
const isValidSignature = checkIsValidPermitAllowanceSignature({
    chainId,
    token: DEFAULT_ERC20[chainId].AXS.address,
    signature, // local state variable that store user signature
    now: currentTime,
})
```

##### _Check is valid permit allowance_

```typescript
import { ChainId, checkIsValidPermitAllowance, DEFAULT_ERC20 } from '@sky-mavis/katana-core';

const currentTime = getIntervalTimeCheckPermit()
const { amount: permitAllowance, expiration: permitExpiration, nonce } = await getPermitAllowance({
    chainId: ChainId.mainnet,
    tokenAddress: DEFAULT_ERC20[chainId].AXS.address,
    owner: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c",
});

const isValidPermitAllowance = checkIsValidPermitAllowance({
    permitAllowance,
    permitExpiration,
    amount,
    now: currentTime,
})
```

##### _Create permit object_

```typescript
import { ChainId, createPermitObj, DEFAULT_ERC20 } from '@sky-mavis/katana-core';

const { nonce } = await getPermitAllowance({
    chainId: ChainId.mainnet,
    tokenAddress: DEFAULT_ERC20[chainId].AXS.address,
    owner: "0x5Ef389000014ACA918BBFa7cAdF3e002F11D560c",
});

const permit = createPermitObj({
    chainId: ChainId.mainnet,
    token: DEFAULT_ERC20[chainId].AXS.address,
    nonce
})
```
