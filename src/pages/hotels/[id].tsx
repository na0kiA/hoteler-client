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
  const facilityBadge = (
    facility: boolean,
    property: string,
    imageSrc: string
  ) => {
    return facility ? (
      <div className="flex text-base">
        <Image src={imageSrc} width={24} height={24} alt="アイコン" />
        <div className="ml-3">{property}</div>
      </div>
    ) : (
      <div className="text-base">アメニティや設備はありません。</div>
    );
  };

  return (
    <Layout title={`${name}のホテル詳細ページ`}>
      <div className="card w-96 md:w-full md:h-full md:p-20 bg-base-100 shadow-xl">
        <figure className="md:hidden max-w-xs h-3/4 m-auto mt-3">
          <Image
            className="md:hidden rounded-lg"
            src="/hoteler_demo_photo.jpg"
            alt="トップ画像"
            width={1280}
            height={720}
            priority={true}
          />
        </figure>

        <div className="hidden md:flex">
          <Image
            className="flex-1 max-w-sm max-h-sm rounded-lg p-1"
            src="/hoteler_demo_photo.jpg"
            alt="トップ画像"
            width={1280}
            height={720}
            priority={true}
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-wrap items-stretch">
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src="/hoteler_demo_photo.jpg"
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src="/hoteler_demo_photo.jpg"
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src="/hoteler_demo_photo.jpg"
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src="/hoteler_demo_photo.jpg"
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        {/* <div className="md:ml-auto text-right">
          <Link
            className="link underline w-1/4 text-sm text-end"
            href={`/hotels/${id}/images`}
          >
            全ての写真を表示
          </Link>
        </div> */}
        {/* <div className="flex"> */}
        <Link
          className="link ml-auto mr-10 md:mr-0"
          href={`/hotels/${id}/images`}
        >
          全ての写真を表示
        </Link>
        {/* </div> */}
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
          {/* <div className="flex text-base"> */}
          {/* {facilityBadge(hotelFacilities.wifiEnabled, "Wi-Fi")} */}
          {facilityBadge(
            hotelFacilities.parkingEnabled,
            "駐車場あり",
            "/かわいい車の線画アイコン.svg"
          )}
          {/* </div> */}
          {/* <div className="flex text-base">
            {facilityBadge(
              hotelFacilities.phoneReservationEnabled,
              "電話予約可能"
            )}
            {facilityBadge(
              hotelFacilities.netReservationEnabled,
              "ネット予約可能"
            )}
          </div>
          <div className="flex text-base">
            {facilityBadge(hotelFacilities.breakfastEnabled, "朝食")}
            {facilityBadge(hotelFacilities.cookingEnabled, "料理")}
          </div>
          <div className="flex text-base">
            {facilityBadge(hotelFacilities.breakfastEnabled, "朝食")}
            {facilityBadge(hotelFacilities.cookingEnabled, "料理")}
          </div>
          <div className="flex text-base">
            {facilityBadge(hotelFacilities.tripleRoomsEnabled, "3人以上")}
          </div>
          <div className="flex text-base">
            {facilityBadge(
              hotelFacilities.secretPaymentEnabled,
              "入室から退室までフロントと会わない"
            )}
          </div> */}
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
