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
      <div className="flex text-base w-full my-1 md:w-1/2 md:p-3 md:m-auto">
        <Image src={imageSrc} width={24} height={24} alt="アイコン" />
        <div className="ml-3">{property}</div>
      </div>
    ) : (
      <div className="text-base">アメニティや設備はありません。</div>
    );
  };

  return (
    <Layout title={`${name}のホテル詳細ページ`}>
      <div className="card p-5 md:w-full md:h-full md:py-5 md:px-20 bg-base-100 shadow-xl">
        <figure className="md:hidden h-3/4 mt-3">
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
        <Link className="link ml-auto text-xs" href={`/hotels/${id}/images`}>
          全ての写真を表示
        </Link>
        <h1 className="flex mt-2">
          <div className="text-3xl font-bold mb-1">{name}</div>
          <div
            className={
              full
                ? "badge badge-lg bg-pink-500 text-black rounded-lg  text-base ml-auto"
                : "badge badge-lg bg-green-500 text-black rounded-lg  text-base ml-auto"
            }
          >
            {full ? "満室" : "空室"}
          </div>
        </h1>
        <h3 className="italic mb-1">{fullAddress}</h3>
        <div className="">{content}</div>
        <hr className="mt-5 border-t border-gray-500" />
      </div>

      {/* コンテンツ */}
      <div className="card w-full md:px-10 md:py-5 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-title md:ml-3 underline">
            提供されるアメニティ・設備
          </div>
          <div className="flex flex-wrap">
            {facilityBadge(hotelFacilities.wifiEnabled, "Wi-Fi", "/Wi-Fi.svg")}
            {facilityBadge(
              hotelFacilities.parkingEnabled,
              "駐車場あり",
              "/駐車場.svg"
            )}
            {facilityBadge(
              hotelFacilities.phoneReservationEnabled,
              "電話予約可能",
              "/電話予約.svg"
            )}
            {facilityBadge(
              hotelFacilities.netReservationEnabled,
              "ネット予約可能",
              "/ネット予約.svg"
            )}
            {facilityBadge(
              hotelFacilities.couponEnabled,
              "クーポン有り",
              "/クーポン.svg"
            )}
            {facilityBadge(
              hotelFacilities.creditCardEnabled,
              "クレジットカード決済可能",
              "/クレジットカード.svg"
            )}
            {facilityBadge(
              hotelFacilities.breakfastEnabled,
              "朝食あり",
              "/朝食.svg"
            )}
            {facilityBadge(
              hotelFacilities.cookingEnabled,
              "料理あり",
              "/料理.svg"
            )}
            {facilityBadge(
              hotelFacilities.tripleRoomsEnabled,
              "3人以上利用可能",
              "/3人以上.svg"
            )}
            {facilityBadge(
              hotelFacilities.secretPaymentEnabled,
              "入室から退室までフロントと会わない",
              "/シークレットペイメント.svg"
            )}
          </div>
        </div>
      </div>
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
