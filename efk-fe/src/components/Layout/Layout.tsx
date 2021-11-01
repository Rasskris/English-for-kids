import type { FC, ReactElement } from 'react';
import Head from 'next/head';
import classnames from 'classnames';
import { Menu } from '../Menu';
import { Footer } from '../Footer';
import { Switcher } from '../Switcher';
import { APP_DESCRIPTION, APP_TITLE } from '../../constants';
import styles from './Layout.module.scss';
import { useAppSelector } from '../../hooks';
import { selectGameMode } from '../../redux/selectors';
import { isGameModePlay, isGameModeTrain } from '../../utils';

interface LayoutProps {
  children: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const gameMode = useAppSelector(selectGameMode);
  const containerStyles = classnames(styles.container, {
    [styles.mode_play]: isGameModePlay(gameMode),
    [styles.mode_train]: isGameModeTrain(gameMode),
  });

  return (
    <div className={containerStyles}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Finger+Paint&family=Fontdiner+Swanky&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta
          property="og:image"
          content="https://rasskris-efk.s3.eu-north-1.amazonaws.com/ee06931d-58bd-4769-8b7a-1949fb1f3eb6-education.png"
        />
        <meta name="og:title" content={APP_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Menu />
        <Switcher />
      </header>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
