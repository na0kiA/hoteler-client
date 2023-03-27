import Head from "next/head";
import React, { memo } from "react";
import Navbar from "./Navbar";

type TITLE = {
  title: string;
  children: any;
};

const Layout = memo(function layout({ children, title }: TITLE) {
  console.log("レイアウトが呼ばれたよ");

  return (
    <>
      <Head>
        <title>{`${title} - ホテラー`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:image"
          // content="https://hoteler.jp/hartIcon.png"
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
