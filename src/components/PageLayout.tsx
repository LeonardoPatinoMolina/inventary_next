import React from "react";
import Head from "next/head";
import { Footer } from "./Footer";
import { HeaderNav } from "./HeaderNav";

interface pageLayoutProps {
  title: string;
  desc: string;
  children: React.ReactNode;
}
 
export const PageLayout: React.FC<pageLayoutProps> = ({ title, desc, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={desc} />
      </Head>
      <HeaderNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
