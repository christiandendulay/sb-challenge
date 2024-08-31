// pages/_app.tsx
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import type { AppProps } from "next/app";

import Header from "@/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
