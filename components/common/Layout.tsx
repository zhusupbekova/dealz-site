import Head from "next/head";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { Footer } from "../layoutComponents/Footer";
import { Header } from "../layoutComponents/Header";

export function Layout({ children }: PropsWithChildren<{}>) {
  const router = useRouter();

  return (
    <div className="h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">{children}</main>

      <Footer />
    </div>
  );
}
