import { AuthProvider } from "context/AuthProvider";
import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";

type TITLE = {
  title: string;
  children: any;
};

const Layout = ({ children, title }: TITLE) => {
  console.log("レイアウトが呼ばれたよ");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={`/heartIcon.png`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <Navbar />
        <div>{children}</div>
      </main>
    </>
  );
};
export default Layout;
