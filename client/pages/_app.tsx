import '../styles/globals.css';
import { store } from '../redux/reducer';
import { Provider } from 'react-redux';

import Head from 'next/head';
import { AppProps } from 'next/app';

import { motion } from 'framer-motion';

import AppLayout from '../layout/Container';

function MyApp({ Component, pageProps, router }: AppProps) {
  const divStyle = {
    height: '100%',
    width: '100%'
  };
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
      <Provider store={store}>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1
            }
          }}
          style={divStyle}
        >
          <Component {...pageProps} />
        </motion.div>
      </Provider>
    </AppLayout>
  );
}

export default MyApp;
