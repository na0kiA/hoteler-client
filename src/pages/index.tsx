import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import { Rating } from "react-simple-star-rating";

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
        <div>
          <>
            {service.plan}
            {service.rate}円{service.startTime}時〜
            {service.endTime}時
          </>
        </div>
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
                    className="object-fill rounded-lg"
                    src="/hoteler_demo_photo.jpg"
                    alt="ホテル画像"
                    width={640}
                    height={480}
                    priority={true}
                  />
                </figure>
                <div className="card-body p-0 mb-10">
                  <h1>
                    <Link href={`/hotels/${hotel.id}`}>
                      <p className="inline-block   mt-1">
                        {sliceNameOrNot(hotel.name)}
                      </p>
                    </Link>
                    {hotel.full ? (
                      <p className="badge ml-1 bg-pink-500 text-black rounded-lg float-right  mt-1">
                        満室
                      </p>
                    ) : (
                      <p className="badge ml-1 bg-green-500 text-black rounded-lg float-right  mt-1">
                        空室
                      </p>
                    )}
                    <div>
                      <p className="text-xs  font-sans">{hotel.fullAddress}</p>
                    </div>
                    <div>
                      <Rating
                        initialValue={hotel.averageRating}
                        transition
                        size={20}
                        allowFraction
                        allowHover={false}
                      />{" "}
                      <span className="align-middle text-sm">
                        ({hotel.averageRating}){" "}
                        <Link
                          href={`/hotels/${hotel.id}/reviews`}
                          className="text-blue-link"
                        >
                          {hotel.reviewsCount}件
                        </Link>
                      </span>
                    </div>
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
