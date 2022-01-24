import NextNProgress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="var(--primary)" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
