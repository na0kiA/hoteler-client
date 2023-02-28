import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { HotelListType } from "types/types";
import { searchHotels } from "lib/hotels";
import Layout from "components/Layout";
import ServiceList from "components/serviceList";
import StarsRating from "components/StarsRating";
import FilterCondition from "components/FilterCondition";

type PROPS = {
  searchedHotelList: HotelListType[];
};

const HotelSearch = ({ searchedHotelList }: PROPS) => {
  const router = useRouter();
  const query = router.query;
  const keyword = query.keyword;
  const filteringCondition = query["hotel_facilities[]"];

  const [checkFilterCard, setCheckFilterCard] = useState<boolean>(false);
  console.log("searchページが呼ばれたよ");

  const sliceNameOrNot = (name: string) => {
    if (name.length > 8) {
      return name.slice(0, 8).concat("…");
    } else {
      return name;
    }
  };

  const makingFilterQuery = () => {
    let queryFacilities = "";
    if (typeof filteringCondition === "string") {
      return `&hotel_facilities[]=${filteringCondition}`;
    } else if (!filteringCondition) {
      return "";
    } else {
      filteringCondition.forEach((facility) => {
        queryFacilities += `&hotel_facilities[]=${facility}`;
      });
      return queryFacilities;
    }
  };

  const onChangeSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const querySort = `&sort=${e.target.value}`;
    router.push(`/search?keyword=${keyword}${makingFilterQuery()}${querySort}`);
  };

  useEffect(() => {
    setCheckFilterCard(false);
  }, [filteringCondition]);

  return (
    <Layout title={`${keyword}の検索結果`}>
      <div className="p-10 pt-5" id="home">
        {searchedHotelList && (
          <>
            <form>
              <div className="flex justify-end mb-3">
                <button
                  className="md:hidden btn btn-outline btn-xs gap-2 mr-5"
                  onClick={(e) => {
                    e.preventDefault();
                    setCheckFilterCard(!checkFilterCard);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                  <div className="text-xs">フィルター</div>
                </button>
                <select
                  className="select select-bordered select-xs max-w-xs"
                  onChange={(e) => {
                    onChangeSort(e);
                  }}
                >
                  <option value="">標準</option>
                  <option value="low_rest">休憩安い順</option>
                  <option value="low_stay">宿泊安い順</option>
                  <option value="high_rest">休憩高い順</option>
                  <option value="high_stay">宿泊高い順</option>
                  <option value="reviews_count">口コミ多い順</option>
                  <option value="favorites_count">お気に入り多い順</option>
                </select>
              </div>
            </form>
            <div className="md:hidden">
              {checkFilterCard && <FilterCondition />}
            </div>
          </>
        )}
        <div className="hidden md:block w-1/3 absolute left-3">
          <FilterCondition />
        </div>
        {searchedHotelList ? (
          searchedHotelList.map((hotel: HotelListType) => (
            <div
              key={hotel.id}
              className="md:flex md:justify-center md:ml-auto md:w-2/3 md:h-2/3"
            >
              <figure className="">
                <Image
                  className="object-fill rounded-lg md:w-4/5 md:h-4/5 md:m-auto"
                  src={
                    hotel?.hotelImages?.[0]?.fileUrl
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
          ))
        ) : (
          <div className="text-center">
            <div className="w-full">
              <p className="text-sm md:text-base py-6 font-bold">
                「{keyword}」に該当するホテルがありませんでした。
              </p>
              <button className="btn btn-primary" onClick={() => router.back()}>
                前へ戻る
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HotelSearch;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const query = ctx.query;
  const keyword = query.keyword;
  const sort = query.sort;
  const hotelFacilities =
    typeof query["hotel_facilities[]"] === "string"
      ? [query["hotel_facilities[]"]]
      : query["hotel_facilities[]"];

  try {
    const searchHotelResponse = await searchHotels(
      keyword,
      sort,
      hotelFacilities
    );
    console.log(searchHotelResponse.data);
    const searchedHotelList = await searchHotelResponse.data.hotels;

    if (!searchedHotelList || typeof searchedHotelList === "string") {
      return {
        props: {
          searchedHotelList: null,
        },
      };
    }

    return {
      props: {
        searchedHotelList,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        notFound: true,
      },
    };
  }
};
