import Head from "next/head";
import React, { memo } from "react";
import Navbar from "./Navbar";

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
        <div>{children}</div>
      </main>
    </>
  );
});
export default Layout;
