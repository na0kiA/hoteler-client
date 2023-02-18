import React from "react";
import Image from "next/image";
import { getHotelImages } from "lib/hotels";
import { HotelImagesType } from "types/types";
import client from "lib/client";
import Layout from "components/Layout";
import { useRouter } from "next/router";

type PROPS = {
  hotelImages: HotelImagesType[];
};

const Images = ({ hotelImages }: PROPS) => {
  const router = useRouter();

  return (
    <Layout title={"ホテル画像一覧"}>
      <div className="mt-3 ml-2">
        <button className="btn btn-circle" onClick={router.back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          {/* 戻る */}
        </button>
      </div>
      {hotelImages &&
        hotelImages.map((image: HotelImagesType) => (
          <div key={image.id} className="flex justify-center mt-5">
            <Image
              src={image.fileUrl}
              className="w-2/3 h-2/3"
              width={1280}
              height={720}
              alt="ホテル画像"
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
    </Layout>
  );
};

export default Images;

export const getServerSideProps = async (ctx: any) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const { id } = ctx.query;

  try {
    const res = await client.get(`/hotels/${id}/images`, {
      headers: {
        "Content-Type": "application/json",
        uid: ctx.req.cookies._uid,
        client: ctx.req.cookies._client,
        "access-token": ctx.req.cookies._access_token,
      },
    });
    const hotelImages: HotelImagesType = await res.data;
    console.log(hotelImages);

    return {
      props: {
        hotelImages,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
