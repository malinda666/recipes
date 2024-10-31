import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { app } from "../../constants";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{app.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
