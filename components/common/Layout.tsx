import React, { PropsWithChildren } from "react";
import Head from "next/head";

import { Footer } from "../layoutComponents/Footer";
import { Header } from "../layoutComponents/Header";
import { classNames } from "../../utils/style";

export function Layout({
  children,
  compact = false,
  className = "",
  containerClassName = "",
}: PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  compact?: boolean;
}>) {
  return (
    <div
      className={classNames(
        "min-h-screen flex flex-col justify-between",
        containerClassName
      )}
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main
        className={classNames(
          compact ? "" : "max-w-screen-2xl px-4",
          "mt-16 flex-1 mx-auto w-full sm:mt-24",
          className
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
