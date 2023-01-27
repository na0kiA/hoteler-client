import React from "react";
import Image from "next/image";

import { getHotelDetail } from "lib/hotels";
import { HotelDetailType } from "types/types";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import client from "lib/client";
import Layout from "components/Layout";

const HotelDetail = ({
  favoritesCount,
  content,
  company,
  phoneNumber,
  postalCode,
  fullAddress,
  hotelFacilities,
  full,
  averageRating,
  reviewsCount,
  hotelImages,
  dayOfTheWeek,
  topFourReviews,
  name,
  id,
}: HotelDetailType) => {
  return (
    <Layout title={`${name}のホテル詳細ページ`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <Image
            className="rounded-lg  m-auto"
            src="/hoteler_demo_photo.jpg"
            alt="ホテル画像"
            width={680}
            height={4800}
            priority={true}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <p className="text-2xl">{name}</p>
            <div
              className={
                full
                  ? "badge badge-lg bg-pink-500 text-black rounded-lg  text-base"
                  : "badge badge-lg bg-green-500 text-black rounded-lg  text-base"
              }
            >
              {full ? "満室" : "空室"}
            </div>
          </h2>
          <p>{fullAddress}</p>
          <div className="">
            <Rating
              initialValue={averageRating}
              transition
              size={30}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
            <span className="text-xl align-middle">
              ({averageRating}){" "}
              <Link
                href={`/hotel/${id}/reviews`}
                className="text-blue-link text-lg"
              >
                {reviewsCount}件
              </Link>
            </span>
          </div>
          <div>{content}</div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">提供されるアメニティ・設備</h2>
          <div className="text-sm">
            {hotelFacilities.wifiEnabled && "Wi-FI"}
            {hotelFacilities.parkingEnabled && "駐車場"}
            {hotelFacilities.phoneReservationEnabled && "電話予約可能"}
            {hotelFacilities.netReservationEnabled && "ネット予約可能"}
            {hotelFacilities.breakfastEnabled && "朝食"}
            {hotelFacilities.cookingEnabled && "料理"}
            {hotelFacilities.tripleRoomsEnabled && "3人以上"}
            {hotelFacilities.secretPaymentEnabled &&
              "入室から退室までフロントと会わない"}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HotelDetail;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const res = await client.get(`/hotels/${id}`, {
      headers: {
        "Content-Type": "application/json",
        uid: ctx.req.cookies["_uid"],
        client: ctx.req.cookies["_client"],
        "access-token": ctx.req.cookies["_access_token"],
      },
    });
    const hotelDetail: HotelDetailType = await res.data;
    return {
      props: {
        ...hotelDetail,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
