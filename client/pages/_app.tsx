import '../styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

import AppLayout from '../layout/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
