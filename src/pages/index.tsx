import React from "react";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";

import { getAllHotel } from "lib/allRequests";
import { HotelListType } from "types/types";
import Layout from "components/Layout";

type PROPS = {
  hotels: HotelListType[];
};

const Home: NextPage<PROPS> = ({ hotels }) => {
  return (
    <>
      <Layout title={"ホテラー"}>
        <div className="bg-black">
          <h2>ホテル一覧</h2>
          <h2>
            {hotels &&
              hotels.map((hotel: HotelListType) => (
                <li key={hotel.id}>
                  <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
                  <p>{hotel.hotelImages}</p>
                  <p>{hotel.full}</p>
                  <p>{hotel.averageRating}</p>
                  <p>{hotel.reviewsCount}</p>
                  <p>
                    {hotel.restRates[0].plan} {hotel.restRates[0].rate}円
                  </p>
                  <p>
                    {hotel.stayRates[0].plan} {hotel.stayRates[0].rate}円
                  </p>
                </li>
              ))}
          </h2>
        </div>
        <div className="bg-black"></div>
      </Layout>
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
