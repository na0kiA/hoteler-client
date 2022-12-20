import React from "react";
import Link from "next/link";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import OnUploadImage from "components/s3ByForm";
import { getAllHotel } from "lib/allRequests";
import { HotelDetailType } from "types/types";

type PROPS = {
  hotels: HotelDetailType[];
};

const Home: NextPage<PROPS> = ({ hotels }) => {
  return (
    <>
      <div className="bg-black">
        <h2>ホテル一覧</h2>
        <h2>
          {hotels &&
            hotels.map((hotel: HotelDetailType) => (
              <li key={hotel.id}>
                <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
                {hotel.hotelImage}
                {hotel.full}
                {hotel.averageRating}
                {hotel.reviewsCount}
                {hotel.restRates.plan}
                {hotel.stayRates.plan}
              </li>
            ))}
        </h2>
      </div>
      <div className="bg-black"></div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAllHotel();
  const hotels = await res.data;
  return {
    props: {
      hotels,
    },
  };
};
export default Home;
