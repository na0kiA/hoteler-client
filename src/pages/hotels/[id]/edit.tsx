import Layout from "components/Layout";
import client from "lib/client";
import { getHotelDetail } from "lib/hotels";
import React from "react";
import { HotelDetailType } from "types/types";

const edit = ({
  favoritesCount,
  content,
  company,
  phoneNumber,
  postalCode,
  fullAddress,
  hotelFacilities,
  full,
  averageRating,
  reviewsCount,
  hotelImages,
  dayOfTheWeek,
  topFourReviews,
  name,
  id,
}: HotelDetailType) => {
  return <Layout title={`${name}の編集ページ`}>edit</Layout>;
};

export default edit;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const [hotelDetail]: any = await Promise.all([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
    ]);
    if (hotelDetail.status == 200) {
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
