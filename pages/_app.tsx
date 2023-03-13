import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {ProductsContextProvider} from './components/ProductsContext';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  );
}

export default MyApp;
