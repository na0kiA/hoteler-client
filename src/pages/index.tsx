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
      return <p className="mt-2">{service}</p>;
    } else {
      return (
        <div>
          <p className="font-mono font-thin mt-1">【{service.plan}】</p>
          <>
            ¥{service.rate} | {service.startTime}
            時〜
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
                <div className="p-0 mb-10">
                  <h1>
                    <Link href={`/hotels/${hotel.id}`}>
                      <div className="inline-block mt-1 text-base font-bold font-mono">
                        {sliceNameOrNot(hotel.name)}
                      </div>
                    </Link>
                    <div
                      className={
                        hotel.full
                          ? "badge ml-1 bg-pink-500 text-black rounded-lg float-right  mt-1"
                          : "badge ml-1 bg-green-500 text-black rounded-lg float-right  mt-1"
                      }
                    >
                      {hotel.full ? "満室" : "空室"}
                    </div>
                    <div>
                      <p className="text-xs  font-sans font-thin italic">
                        {hotel.fullAddress}
                      </p>
                    </div>
                    <div>
                      <Rating
                        initialValue={hotel.averageRating}
                        transition
                        size={20}
                        allowFraction
                        allowHover={false}
                      />
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
