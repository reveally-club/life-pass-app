import "@/styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";

const ibm = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <title>갓생.c패쓰</title>
        <meta name="description" content="갓생.패쓰" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://life.reveally.club" />
        <meta property="og:title" content="갓생.패쓰" />
        <meta property="og:image" content="https://life.reveally.club/og.png" />
        <meta property="og:description" content="갓생.패쓰" />
        <meta property="og:site_name" content="reveally.club" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="갓생.패쓰" />
        <meta name="twitter:title" content="갓생.패쓰" />
        <meta name="twitter:description" content="갓생.패쓰" />
        <meta name="twitter:url" content="https://life.reveally.club" />
      </Head>
      <main className={ibm.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
