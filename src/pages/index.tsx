import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";

import { getAllHotel } from "lib/allRequests";
import { HotelListType, ServiceRateType } from "types/types";
import Layout from "components/Layout";

type PROPS = {
  hotels: HotelListType[];
};

const Home = ({ hotels }: PROPS) => {
  const isBusinessHourOrNot = (service: ServiceRateType) => {
    if (typeof service === "string") {
      return service;
    } else {
      return (
        <p>
          {service.plan} {service.rate}円
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
        <div className="md:grid grid-cols-4 gap-5 p-10">
          {hotels &&
            hotels.map((hotel: HotelListType) => (
              <div key={hotel.id}>
                <figure>
                  <Image
                    className="w-screen h-screen object-fill rounded-lg"
                    src="/hoteler_demo_photo.jpg"
                    alt="ホテル画像"
                    width={640}
                    height={480}
                  />
                </figure>
                <div className="card-body p-0 mb-10">
                  <h1>
                    <Link
                      href={`/hotels/${hotel.id}`}
                      className="text-lg font-bold"
                    >
                      {sliceNameOrNot(hotel.name)}
                    </Link>
                    {hotel.full ? (
                      <p className="badge ml-1 bg-pink-500 text-black rounded-lg">
                        満室
                      </p>
                    ) : (
                      <p className="badge ml-1 bg-green-500 text-black rounded-lg">
                        空室
                      </p>
                    )}
                    <div>
                      <p className="text-xs  font-sans">{hotel.fullAddress}</p>
                      <p className="text-sm">
                        {hotel.averageRating} {hotel.reviewsCount}件{" "}
                      </p>
                    </div>
                  </h1>
                  <p className="text-sm">
                    {isBusinessHourOrNot(hotel.restRates)}
                    {isBusinessHourOrNot(hotel.stayRates)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );

  const apiResponse = await getAllHotel();
  const hotels = await apiResponse.data;

  return {
    props: {
      hotels,
    },
  };
};
export default Home;
