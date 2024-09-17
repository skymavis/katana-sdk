import { Button } from '@nextui-org/react';
import NextLink from 'next/link';
import { FC } from 'react';

import { RoninLogoSVG } from '@/components/svg/RoninLogo';
import { useRoninWalletGoContext, useRoninWalletGoDialog } from '@/contexts/RoninWalletgo';
import { truncateAddress } from '@/utils/truncate';

import styles from './Header.module.scss';

const Header: FC = () => {
  const { account } = useRoninWalletGoContext();
  const { setOpen } = useRoninWalletGoDialog();

  const handleOpenWidget = () => {
    setOpen(true);
  };

  return (
    <header className={styles.header}>
      <NextLink href={'/'}>
        <RoninLogoSVG />
      </NextLink>
      {account ? (
        <Button variant="ghost" onClick={handleOpenWidget}>
          {truncateAddress(account)}
        </Button>
      ) : (
        <Button color="primary" onClick={handleOpenWidget}>
          Connect Wallet
        </Button>
      )}
    </header>
  );
};
export default Header;
