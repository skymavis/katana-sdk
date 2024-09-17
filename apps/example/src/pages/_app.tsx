import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/layout/Layout';
import { RoninWalletgoProvider } from '@/contexts/RoninWalletgo';

import '../styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider defaultTheme="dark">
        <RoninWalletgoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RoninWalletgoProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
