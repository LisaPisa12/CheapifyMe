import '../styles/globals.css';

import Head from 'next/head';
import { AppProps } from 'next/app';

import AppLayout from '../layout/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Cheapify Me</title>

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0072de" />

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
