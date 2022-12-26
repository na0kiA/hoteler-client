import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";

import { getAllHotel } from "lib/allRequests";
import { HotelListType, ServiceRateType } from "types/types";
import Layout from "components/Layout";
import StarsRating from "components/StarsRating";

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
                    <Link href={`/hotels/${hotel.id}`}>
                      <p>{sliceNameOrNot(hotel.name)}</p>
                    </Link>
                    <div>
                      {hotel.full ? (
                        <div className="badge ml-1 bg-pink-500 text-black rounded-lg">
                          <p>満室</p>
                        </div>
                      ) : (
                        <div className="badge ml-1 bg-green-500 text-black rounded-lg">
                          <p>空室</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs  font-sans">{hotel.fullAddress}</p>
                    </div>
                    <p className="text-sm">
                      <StarsRating value={Number(hotel.averageRating)} />
                      {hotel.reviewsCount}件
                    </p>
                  </h1>
                  <div className="text-sm">
                    {isBusinessHourOrNot(hotel.stayRates)}
                  </div>
                  <div className="text-sm">
                    {isBusinessHourOrNot(hotel.restRates)}
                  </div>
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
