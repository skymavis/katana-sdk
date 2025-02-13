import { DEFAULT_EXTENSIONS as DEFAULT_BABEL_EXTENSIONS } from '@babel/core';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import nodeExternals from 'rollup-plugin-node-externals';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

const mainConfig = defineConfig({
  input: ['src/index.ts'],
  output: [
    {
      dir: 'dist/mjs',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      dynamicImportInCjs: false,
    },
  ],
  external: [
    '@ethersproject/providers',
    '@ethersproject/address',
    '@ethersproject/bignumber',
    '@ethersproject/units',
    '@ethersproject/abstract-provider',
    '@ethersproject/contracts',
    '@ethersproject/properties',
    '@ethersproject/abstract-signer',
    '@ethersproject/hash',
    '@ethersproject/web',
    '@ethersproject/solidity',
    '@ethersproject/bytes',
    '@ethersproject/strings',
    '@ethersproject/abi',
    '@ethersproject/keccak256',
  ],
  plugins: [
    // JS build
    nodeExternals(),
    peerDepsExternal(),
    nodeResolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    json(),
    babel({
      extensions: [...DEFAULT_BABEL_EXTENSIONS, 'ts', 'tsx'],
      exclude: 'node_modules/**',
      plugins: [
        'babel-plugin-macros',
        'babel-plugin-annotate-pure-calls',
        'babel-plugin-dev-expression',
        ['babel-plugin-polyfill-regenerator', { method: 'usage-pure' }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            loose: true,
            targets: 'last 3 versions, IE 11, not dead',
          },
        ],
      ],
      babelHelpers: 'bundled',
    }),
  ],
});

export default mainConfig;
