const withTM = require('next-transpile-modules')(['@roninnetwork/walletgo']);

const chainId = process.env.CHAIN_ID;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withTM({
  reactStrictMode: true,
  env: {
    chainId,
  },
  publicRuntimeConfig: {
    chainId,
  },
});

module.exports = nextConfig;
