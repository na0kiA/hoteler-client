import React from "react";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";

import { getAllHotel } from "lib/allRequests";
import { HotelListType, ServiceRateType } from "types/types";
import Layout from "components/Layout";

type PROPS = {
  hotels: HotelListType[];
};

const Home: NextPage<PROPS> = ({ hotels }) => {
  const opneOrClsed = (service: ServiceRateType[]) => {
    if (typeof service === "string") {
      return service;
    } else {
      return (
        <p>
          {service[0].plan} {service[0].rate}円
        </p>
      );
    }
  };

  return (
    <>
      <Layout title={"ホテラー"}>
        <div>
          <h2>ホテル一覧</h2>
          <h2>
            {hotels &&
              hotels.map((hotel: HotelListType) => (
                <div key={hotel.id}>
                  <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
                  <p>{hotel.hotelImages}</p>
                  <p>{hotel.full}</p>
                  <p>{hotel.averageRating}</p>
                  <p>{hotel.reviewsCount}</p>
                  {opneOrClsed(hotel.restRates)}
                  {opneOrClsed(hotel.stayRates)}
                </div>
              ))}
          </h2>
        </div>
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
