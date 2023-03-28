import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

type PROPS = {
  title: string;
};

const HomeIcon = memo(function homeIcon({ title }: PROPS) {
  console.log("HomeIconが呼ばれたよ");

  return (
    <>
      <Head>
        <title>{`${title} - ホテラー`}</title>
        <link rel="icon" href="/hartIcon.png" />
        <meta property="og:title" content="ホテラー hoteler.jp" />
        <meta
          property="og:description"
          content="ラブホテルの掲載＆口コミサイトです"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:image"
          content="https://hoteler-image-list.s3.ap-northeast-1.amazonaws.com/hartIcon.png"
        />
      </Head>

      <div className="navbar bg-neutral text-neutral-content  h-16">
        <div className="navbar-start flex-1 ml-2">
          <Link
            href={"/"}
            replace={true}
            className="btn btn-ghost normal-case text-lg p-0"
          >
            <Image
              src="/hartIcon.png"
              alt="ホテル画像"
              width={50}
              height={50}
              priority={true}
            />
            <span className="ml-2"> ホテラー</span>
          </Link>
        </div>
      </div>
    </>
  );
});

export default HomeIcon;
