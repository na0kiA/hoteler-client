import React from "react";
import Image from "next/image";
import { getHotelImages } from "lib/hotels";
import { HotelImagesType } from "types/types";
import client from "lib/client";

const images = ({ id, fileUrl }: HotelImagesType) => {
  return (
    <div className="hidden md:flex">
      <Image
        className="flex-1 max-w-sm max-h-sm rounded-lg p-1"
        src="/hoteler_demo_photo.jpg"
        alt="トップ画像"
        width={1280}
        height={720}
        priority={true}
        style={{ objectFit: "cover" }}
      />
      <div className="flex flex-wrap items-stretch">
        <Image
          className="w-1/2 h-1/2 rounded-lg p-1"
          src="/hoteler_demo_photo.jpg"
          alt="セカンド画像"
          width={1280}
          height={720}
          priority={true}
          style={{ objectFit: "cover" }}
        />
        <Image
          className="w-1/2 h-1/2 rounded-lg p-1"
          src="/hoteler_demo_photo.jpg"
          alt="セカンド画像"
          width={1280}
          height={720}
          priority={true}
          style={{ objectFit: "cover" }}
        />
        <Image
          className="w-1/2 h-1/2 rounded-lg p-1"
          src="/hoteler_demo_photo.jpg"
          alt="セカンド画像"
          width={1280}
          height={720}
          priority={true}
          style={{ objectFit: "cover" }}
        />
        <Image
          className="w-1/2 h-1/2 rounded-lg p-1"
          src="/hoteler_demo_photo.jpg"
          alt="セカンド画像"
          width={1280}
          height={720}
          priority={true}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default images;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const res = await client.get(`/hotels/${id}/images`, {
      headers: {
        "Content-Type": "application/json",
        uid: ctx.req.cookies["_uid"],
        client: ctx.req.cookies["_client"],
        "access-token": ctx.req.cookies["_access_token"],
      },
    });
    const hotelImages: HotelImagesType = await res.data;
    return {
      props: {
        ...hotelImages,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
