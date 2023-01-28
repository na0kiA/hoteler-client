import Head from "next/head";
import Link from "next/link";
import React, { memo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type TITLE = {
  title: string;
  children: any;
};

const Layout = memo(({ children, title }: TITLE) => {
  console.log("レイアウトが呼ばれたよ");

  return (
    <>
      <Head>
        <title>{`${title} - ホテラー`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:image" content={`/heartIcon.png`} />
        <meta property="og:image:width" content={String(50)} />
        <meta property="og:image:height" content={String(50)} />
      </Head>
      <main>
        <Navbar />
        <>{children}</>
      </main>
    </>
  );
});
export default Layout;
