import { createRoninWallets, createWalletgoContext, WalletgoProvider, WalletWidget } from '@roninnetwork/walletgo';
import React, { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react';

import { useGetRuntimeChainId } from '@/hooks/useGetRuntimeChainId';

const RoninWalletgoContext = createWalletgoContext('RoninWalletgoContext');

interface IDialogContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const RoninWalletgoDialogContext = createContext<IDialogContextValue>({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setOpen: (value: boolean) => {},
});

const WC_PROJECT_ID = 'd2ef97836db7eb390bcb2c1e9847ecdc';

interface IProviderProps {
  children: ReactNode;
}

const useRoninWalletGoContext = () => {
  return useContext(RoninWalletgoContext);
};

const useRoninWalletGoDialog = () => {
  return useContext(RoninWalletgoDialogContext);
};

const RoninWalletgoProvider: FC<IProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const chainId = useGetRuntimeChainId();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <WalletgoProvider defaultChainId={chainId} context={RoninWalletgoContext}>
      <RoninWalletgoDialogContext.Provider value={{ open, setOpen }}>
        <WalletWidget
          wallets={createRoninWallets({
            projectId: WC_PROJECT_ID,
            clientMeta: {
              name: 'App.Ronin',
              description: 'App.Ronin',
              icons: [`https://cdn.skymavis.com/explorer-cdn/asset/favicon/apple-touch-icon.png`],
              url: 'https://app.roninchain.com',
              redirect: {
                universal: 'https://app.roninchain.com',
              },
            },
            ethereumWallets: false,
          })}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          customContext={RoninWalletgoContext}
        />

        {children}
      </RoninWalletgoDialogContext.Provider>
    </WalletgoProvider>
  );
};

export { RoninWalletgoProvider, useRoninWalletGoContext, useRoninWalletGoDialog };
