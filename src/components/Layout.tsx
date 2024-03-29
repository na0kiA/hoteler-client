import Head from "next/head";
import React, { memo } from "react";
import Navbar from "./Navbar";

type TITLE = {
  title: string;
  children: any;
};

const Layout = memo(function layout({ children, title }: TITLE) {
  return (
    <>
      <Head>
        <title>{`${title} - ホテラー`}</title>
        <link rel="icon" href="/hartIcon.png" />
        <meta property="og:title" content="ホテラー" />
        <meta
          property="og:description"
          content="レジャーホテルの掲載＆口コミサイトです"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:image"
          content="https://hoteler-image-list.s3.ap-northeast-1.amazonaws.com/hartIcon.png"
        />
      </Head>
      <main>
        <Navbar />
        <>{children}</>
      </main>
    </>
  );
});
export default Layout;
