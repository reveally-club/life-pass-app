import Head from "next/head";
import { Public_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { fireAnalytics } from "@/modules/firebase";
import "@/styles/globals.scss";

const publicSans = Public_Sans({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window != undefined) {
      fireAnalytics;
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <title>life.pass | 갓생.패쓰</title>
        <meta name="description" content="life.pass | 갓생.패쓰" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://life.reveally.club" />
        <meta property="og:title" content="life.pass | 갓생.패쓰" />
        <meta property="og:image" content="https://life.reveally.club/og.png" />
        <meta
          property="og:description"
          content="Betting Platform Services to Achieve Your Objectives, life.pass a.k.a 갓생.패쓰"
        />
        <meta property="og:site_name" content="life.reveally.club" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="life.pass | 갓생.패쓰" />
        <meta name="twitter:title" content="life.pass | 갓생.패쓰" />
        <meta
          name="twitter:description"
          content="Betting Platform Services to Achieve Your Objectives, life.pass a.k.a 갓생.패쓰"
        />
        <meta name="twitter:url" content="https://life.reveally.club" />
      </Head>
      <main className={publicSans.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
