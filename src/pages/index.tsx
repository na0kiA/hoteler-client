import React from "react";
import Link from "next/link";
import type { GetServerSideProps } from "next";

import { getAllHotel } from "lib/allRequests";
import { HotelListType, ServiceRateType } from "types/types";
import Layout from "components/Layout";

type PROPS = {
  hotels: HotelListType[];
};

const Home = ({ hotels }: PROPS) => {
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

  const sliceNameOrNot = (name: string) => {
    if (name.length > 6) {
      return name.slice(0, 5).concat("...");
    } else {
      return name;
    }
  };

  return (
    <>
      <Layout title={"ホテラー"}>
        <div className="h-screen grid grid-cols-4 gap-5 p-10">
          {hotels &&
            hotels.map((hotel: HotelListType) => (
              <div
                key={hotel.id}
                className="card-bordered card-compact w-68 bg-base-100 shadow-xl"
              >
                <figure>
                  <img
                    src="https://placeimg.com/400/225/arch"
                    alt="ホテル画像"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-base">
                    <Link href={`/hotels/${hotel.id}`}>
                      {sliceNameOrNot(hotel.name)}
                    </Link>
                    <div className="badge badge-secondary">
                      {hotel.full ? "満室" : "空室"}
                    </div>
                  </h2>
                  <p className="card-title text-xs leading-none text-opacity-100">
                    {hotel.fullAddress}
                  </p>
                  <p className="leading-none">
                    ({hotel.averageRating}) {hotel.reviewsCount}件
                  </p>
                  {opneOrClsed(hotel.restRates)}
                  {opneOrClsed(hotel.stayRates)}
                </div>
              </div>
            ))}
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
