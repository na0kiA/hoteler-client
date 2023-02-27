import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllHotel } from "lib/hotels";
import { HotelListType } from "types/types";
import Layout from "components/Layout";
import StarsRating from "components/StarsRating";
import ServiceList from "components/serviceList";
import { GetServerSideProps } from "next";
import useSWRInfinite from "swr/infinite";
import { useIntersection } from "hooks/useInterSection";
import client from "lib/client";
import axios from "axios";

type PROPS = {
  hotels: HotelListType[];
};

const Home = ({ hotels }: PROPS) => {
  console.log("index.tsxが呼ばれたよ");

  const sliceNameOrNot = (name: string) => {
    if (name.length > 6) {
      return name.slice(0, 6).concat("…");
    } else {
      return name;
    }
  };

  // トリガーのdiv要素への参照
  const ref = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  // トリガーが表示されているか監視
  const intersection = useIntersection(ref);

  // useSWRInfiniteのキーとなるパラメータ付きURLを生成
  const getKey = (pageIndex: number, previousPageData: HotelListType[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${process.env.NEXT_PUBLIC_API_URL}/v1/hotels?page=${pageIndex + 1}`;
  };

  // fetchを使用してデータを取得
  type HotelListResponse = {
    hotels: HotelListType[];
  };

  const {
    data: hotelList,
    error,
    size,
    setSize,
  } = useSWRInfinite(
    getKey,
    (url) =>
      axios.get<HotelListResponse>(url).then((res) => {
        const hotelData = res.data.hotels;
        return hotelData;
      }),
    {
      initialSize: 1,
      fallbackData: [hotels],
    }
  );

  const limitPage = 3;

  const isEmptyValue = hotelList?.[0]?.length === 0;
  const isReachingEnd =
    isEmptyValue ||
    (hotelList && hotelList[hotelList.length - 1]?.length < limitPage);

  // 次のデータの取得
  const getHotels = async () => {
    setSize(size + 1);
  };

  useEffect(() => {
    // トリガーが表示されたらデータを取得
    if (intersection && !isReachingEnd) {
      getHotels();
    }
  }, [intersection, isReachingEnd]);

  if (error) return "failed to load";
  if (!hotelList) return "loading";

  const flattenHotelList = hotelList.flat();
  console.log(flattenHotelList);

  return (
    <Layout title={"ホテル一覧"}>
      <div className="md:grid grid-cols-4 gap-5 p-10 pt-5" id="home">
        {flattenHotelList &&
          flattenHotelList.map((hotel: HotelListType) => (
            <div key={hotel.id}>
              <figure>
                <Image
                  className="object-fill rounded-lg"
                  src={
                    hotel.hotelImages && hotel.hotelImages[0]?.fileUrl
                      ? hotel.hotelImages[0]?.fileUrl
                      : "/noImageHotel.png"
                  }
                  alt="ホテル画像"
                  width={640}
                  height={480}
                  priority={true}
                />
              </figure>
              <div className="p-0 mb-10">
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
                <StarsRating props={hotel} />
                <ServiceList stay={hotel.stayRates} rest={hotel.restRates} />
              </div>
            </div>
          ))}
      </div>
      {/* <div className="absolute bottom-5 right-10">
        <button className="btn btn-square loading"></button>
      </div> */}
      <div ref={ref}>
        {!isReachingEnd ? (
          <div className="absolute bottom-5 right-10">
            <button className="btn btn-square loading"></button>
          </div>
        ) : (
          <></>
        )}
        {isEmptyValue ? <></> : null}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );

  const apiResponse = await getAllHotel(1);
  const hotels = await apiResponse.data.hotels;
  const meta = await apiResponse.data.meta;
  console.log(meta);

  return {
    props: {
      hotels,
    },
  };
};
export default Home;
