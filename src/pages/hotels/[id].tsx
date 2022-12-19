import React from "react";
import { GetServerSideProps } from "next";

import { getHotelDetail } from "lib/allRequests";
import { HotelDetailType } from "types/types";

const HotelDetail: React.FC<HotelDetailType> = ({ name, content, full }) => {
  return (
    <>
      <h1>{name}</h1>
      <h1>{content}</h1>
      <h1>{full === true ? <p>満室</p> : <p>空室</p>}</h1>
    </>
  );
};
export default HotelDetail;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  // console.log(getHotelDetail(id));
  const hotelDetail = getHotelDetail(id);
  console.log(hotelDetail);
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/hotels/${id}`);
  // const hotelDetail = await res.json();
  console.log(hotelDetail);
  return {
    props: {
      ...hotelDetail,
    },
  };
};
