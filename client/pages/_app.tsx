import '../styles/globals.css';

import { AppProps } from 'next/app';
import AppLayout from '../layout/Container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
