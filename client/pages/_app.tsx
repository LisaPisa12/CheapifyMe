import { store } from '../redux/reducer';
import '../styles/globals.css';
import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/client';
import { client } from '../Apollo';

import Head from 'next/head';
import { AppProps } from 'next/app';

import { AnimatePresence } from 'framer-motion';

import AppLayout from '../layout/Container';

function MyApp({ Component, pageProps, router }: AppProps) {
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
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </Provider>
      </ApolloProvider>
    </AppLayout>
  );
}

export default MyApp;
