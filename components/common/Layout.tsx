import React, { PropsWithChildren } from "react";
import Head from "next/head";

import { Footer } from "../layoutComponents/Footer";
import { Header } from "../layoutComponents/Header";

export function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-16 flex-1 mx-auto w-full max-w-screen-2xl px-4 sm:mt-24">
        {children}
      </main>

      <Footer />
    </div>
  );
}
