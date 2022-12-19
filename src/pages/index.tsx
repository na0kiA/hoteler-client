import React from "react";
import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";

import OnUploadImage from "components/s3ByForm";
// import TopPage from "components/topPage";
// import { getAllHotel } from "lib/allRequests";

const Home: NextPage<any> = ({ hotels }) => {
  return (
    <>
      <div className="bg-black">
        <h2>ホテル一覧</h2>
        <h2>
          {hotels &&
            hotels.map((hotel: any) => (
              <li key={hotel.id}>
                <Link href={`/hotels/${hotel.id}`}>
                  <a>{hotel.name}</a>
                </Link>
                <a>{hotel.hotel_images}</a>
                <a>{hotel.full}</a>
                <a>{hotel.average_rating}</a>
                <a>{hotel.reviews_count}</a>
                <a>{hotel.rest_rates.plan}</a>
                <a>{hotel.stay_rates.plan}</a>
              </li>
            ))}
        </h2>
      </div>
      <div className="bg-black"></div>
      <div>
        <OnUploadImage />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/hotels`);
  const hotels = await res.json();
  // console.log(hotels);
  return {
    props: {
      hotels,
    },
  };
};
export default Home;
