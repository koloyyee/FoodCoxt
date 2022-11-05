import type {AppProps} from 'next/app';
import React from 'react';
import '../styles/globals.css';

/**
 *
 * @param {AppProps} param0 Next JS Special props
 * @return {React.Component}
 */
function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
