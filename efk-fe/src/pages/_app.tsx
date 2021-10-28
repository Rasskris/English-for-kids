/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { storeWrapper } from '../redux/store';
import { Layout } from '../components';
import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default storeWrapper.withRedux(App);
