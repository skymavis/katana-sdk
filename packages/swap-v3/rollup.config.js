import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';

const config = defineConfig({
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: false,
      compact: true,
      minifyInternalExports: true,
    },
  ],
  external: [
    'ethers',
    'ethers/lib/utils',
    'typechain',
    'axios',
    '@uniswap/permit2-sdk',
    '@walletconnect/ethereum-provider',
    '@ethersproject/providers',
    '@ethersproject/hash',
  ],
  plugins: [
    json(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
});

export default config;
