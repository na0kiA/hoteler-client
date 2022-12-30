import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

type TITLE = {
  title: string;
  children: any;
};

const Layout = ({ children, title = "ホテラー" }: TITLE) => {
  return (
    <>
      <Navbar />
      <Head>
        <title>ホテラー</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <div>{children}</div>
      </main>
    </>
  );
};
export default Layout;
