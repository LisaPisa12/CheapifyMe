import '../styles/globals.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import { state } from '../types/redux';

import Head from 'next/head';
import { AppProps } from 'next/app';

import { motion } from 'framer-motion';

import AppLayout from '../layout/Container';
import { CoordsProvider } from '../hooks/useCoords';

const initialState: state = {
  isLoading: false,
  coords: {
    latitude: 41.395039,
    longitude: 12.19796
  },
  places: []
};
function reducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case 'SET_COORDINATES':
      console.log('from coordinates action type:', action.payload);
      return { ...state, coords: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_PLACES':
      return { ...state, places: action.payload };

    default:
      return state;
  }
}
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

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
      </Head>
      <Provider store={store}>
        <CoordsProvider>
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
          >
            <Component {...pageProps} />
          </motion.div>
        </CoordsProvider>
      </Provider>
    </AppLayout>
  );
}

export default MyApp;
