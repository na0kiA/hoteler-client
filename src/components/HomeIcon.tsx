import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const HomeIcon = memo(({ title }: any) => {
  console.log("HomeIconが呼ばれたよ");

  return (
    <>
      <Head>
        <title>{`${title} - ホテラー`}</title>
        <meta property="og:image" content={`/heartIcon.png`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
