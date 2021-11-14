import type { FC, ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classnames from 'classnames';
import { Menu } from '../Menu';
import { Footer } from '../Footer';
import { Switcher } from '../Switcher';
import { APP_DESCRIPTION, APP_TITLE, TOAST_OPTIONS } from '../../constants';
import styles from './Layout.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectGameMode } from '../../redux/selectors';
import { isGameModePlay, isGameModeTrain } from '../../utils';
import { signOut } from '../../redux/thunks';

interface LayoutProps {
  children: ReactElement;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const gameMode = useAppSelector(selectGameMode);
  const dispatch = useAppDispatch();
  const containerStyles = classnames(styles.container, {
    [styles.mode_play]: isGameModePlay(gameMode),
    [styles.mode_train]: isGameModeTrain(gameMode),
  });

  const handleSignOut = () => {
    dispatch(signOut(user));
    toast.info('Good Bye!', TOAST_OPTIONS);
  };

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
        <div className={styles.wrapper}>
          {isAuth ? (
            <button
              type="button"
              className={`${styles.link} ${styles.link_signOut}`}
              data-tooltip="Sign Out"
              onClick={handleSignOut}
            />
          ) : (
            <Link href="/auth/signin">
              <a className={`${styles.link} ${styles.link_signIn}`} data-tooltip="Sign In" />
            </Link>
          )}
          <Switcher />
        </div>
      </header>
      <main className={styles.main}>
        <ToastContainer /> {children}
      </main>
      <Footer />
    </div>
  );
};
