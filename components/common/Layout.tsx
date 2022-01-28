import React, { PropsWithChildren } from "react";
import Head from "next/head";

import { Footer } from "../layoutComponents/Footer";
import { Header } from "../layoutComponents/Header";
import { classNames } from "../../utils/style";
import { IUserProps } from "../../utils/schema";
import { brand } from "../../config";

export function Layout({
  children,
  compact = false,
  className = "",
  containerClassName = "",
  user,
  head = "",
  metaDescription = "",
}: PropsWithChildren<{
  className?: string;
  containerClassName?: string;
  compact?: boolean;
  user?: IUserProps;
  head: string;
  metaDescription: string;
}>) {
  return (
    <div
      className={classNames(
        "min-h-screen flex flex-col justify-between",
        containerClassName
      )}
    >
      <Head>
        <title>
          {head}-Save money with {brand.name}
        </title>
        <link rel="icon" href={brand.logo} />
        <meta name="description" content={metaDescription}></meta>
      </Head>
      <Header user={user} />
      <main
        className={classNames(
          compact ? "" : "max-w-screen-2xl px-4",
          "mt-10 flex-1 mx-auto w-full sm:mt-24",
          className
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
