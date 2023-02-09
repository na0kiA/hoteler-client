import Link from "next/link";
import React from "react";
import Layout from "components/Layout";
import client from "lib/client";
import { getHotelImages } from "lib/hotels";
import { HotelEditType } from "types/types";
import HotelUploadImages from "components/HotelUploadImages";
import {
  HotelFormProvider,
  useHotelFormStateContext,
} from "context/HotelFormProvider";
import { useAuthStateContext } from "context/AuthProvider";

const Facilities = ({
  name,
  id,
  hotelFacilities,
  hotelImages,
}: HotelEditType) => {
  const hotelId = id.toString();
  // const { setKeyList } = useHotelFormStateContext();
  const image = hotelImages.map((image) => {
    return image.fileUrl;
  });
  const keys = hotelImages.map((image) => {
    return image.key;
    // setKeyList(keys);
  });

  return (
    <Layout title={`${name}の設備編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            href={`/hotels/${id}/edit`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            詳細
          </Link>
          <Link
            href={`/hotels/${id}/edit/rate`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            料金
          </Link>
          <div className="tab tab-md md:tab-lg tab-bordered tab-active">
            設備
          </div>
        </div>
      </div>
      <HotelFormProvider>
        <HotelUploadImages imageUrl={image} keys={keys} />
      </HotelFormProvider>
    </Layout>
  );
};

export default Facilities;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;
  try {
    const [hotelDetail, currentUser]: any = await Promise.all([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
      client.get(`/auth/sessions`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
    ]);

    if (currentUser.data.data.id === hotelDetail.data.userId) {
      return {
        props: {
          ...hotelDetail.data,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
