import "@/styles/globals.css";
import Head from "next/head";
import { AuthUserProvider } from "@/context/AuthUserContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mosharof || Todo App</title>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </>
  );
}
