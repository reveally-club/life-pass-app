import "@/styles/globals.css";
import { IBM_Plex_Sans } from "next/font/google";
import type { AppProps } from "next/app";

const ibm = IBM_Plex_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ibm.className}>
      <Component {...pageProps} />
    </main>
  );
}
