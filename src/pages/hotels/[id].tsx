import React from "react";
import { GetServerSideProps } from "next";

import { getHotelDetail } from "lib/allRequests";
import { HotelDetailType } from "types/types";

const HotelDetail: React.FC<HotelDetailType> = ({
  name,
  content,
  full,
  favoritesCount,
}) => {
  return (
    <>
      <h1>{name}</h1>
      <h1>{content}</h1>
      <h1>{full === true ? <p>満室</p> : <p>空室</p>}</h1>
      <h1>{favoritesCount}</h1>
    </>
  );
};
export default HotelDetail;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await getHotelDetail(id);
  const hotelDetail: HotelDetailType = res.data;
  if (!hotelDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...hotelDetail,
    },
  };
};
