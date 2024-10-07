type ITokenTag = 'main' | 'seed';

type IAllPublicTokens = {
  token_address: string;
  token_symbol: string;
  token_decimals: string;
  token_name: string;
  is_active: boolean;
  tag: ITokenTag;
};

export type { IAllPublicTokens };
