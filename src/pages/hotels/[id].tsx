import React, { useState } from "react";
import Image from "next/image";

import { HotelDetailType, ReviewEditParams, ReviewType } from "types/types";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import client from "lib/client";
import Layout from "components/Layout";
import { useForm, useFormState } from "react-hook-form";
import { useRouter } from "next/router";
import { createReview } from "lib/reviews";
import PostReviewForm from "components/PostReviewForm";
import { useAuthStateContext } from "context/AuthProvider";
import { log } from "console";

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
  userId,
}: HotelDetailType) => {
  const { currentUser } = useAuthStateContext();
  const router = useRouter();
  const [postReviewToggle, setPostReviewToggle] = useState(false);
  const facilityBadge = (
    facility: boolean,
    property: string,
    imageSrc: string
  ) => {
    return (
      facility && (
        <div className="flex text-base w-full my-1 md:w-1/2 md:p-3 md:m-auto">
          <Image src={imageSrc} width={24} height={24} alt="アイコン" />
          <div className="ml-3">{property}</div>
        </div>
      )
    );
  };

  const sliceString = (content: string, point: number) => {
    if (content.length > point) {
      return content.slice(0, point).concat("…");
    } else {
      return content;
    }
  };

  return (
    <Layout title={`${name}のホテル詳細ページ`}>
      <div className="card p-8 md:w-full md:h-full md:py-5 md:px-20 bg-base-100 shadow-xl">
        <figure className="md:hidden h-3/4 mt-3">
          <Image
            className="md:hidden rounded-lg"
            src={
              hotelImages && hotelImages[0]?.fileUrl
                ? hotelImages[0]?.fileUrl
                : "/noImageHotel.png"
            }
            alt="トップ画像"
            width={1280}
            height={720}
            priority={true}
            style={{ objectFit: "cover" }}
          />
        </figure>
        <div className="hidden md:flex">
          <Image
            className="flex lg:max-w-lg lg:max-h-lg md:max-w-sm md:max-h-sm rounded-lg p-1"
            src={
              hotelImages && hotelImages[0]?.fileUrl
                ? hotelImages[0].fileUrl
                : "/noImageHotel.png"
            }
            alt="トップ画像"
            width={1280}
            height={720}
            priority={true}
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-wrap items-stretch">
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src={
                hotelImages && hotelImages[1]?.fileUrl
                  ? hotelImages[1].fileUrl
                  : "/noImageHotel.png"
              }
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src={
                hotelImages && hotelImages[2]?.fileUrl
                  ? hotelImages[2].fileUrl
                  : "/noImageHotel.png"
              }
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src={
                hotelImages && hotelImages[3]?.fileUrl
                  ? hotelImages[3].fileUrl
                  : "/noImageHotel.png"
              }
              alt="セカンド画像"
              width={1280}
              height={720}
              priority={true}
              style={{ objectFit: "cover" }}
            />
            <Image
              className="w-1/2 h-1/2 rounded-lg p-1"
              src={
                hotelImages && hotelImages[4]?.fileUrl
                  ? hotelImages[4].fileUrl
                  : "/noImageHotel.png"
              }
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
        <hr className="mt-10 border-t border-gray-500" />
      </div>

      {/* アメニティと設備 */}
      <div className="card w-full md:px-10  bg-base-100 shadow-xl">
        <div className="card-body md:pb-3">
          <div className="card-title md:ml-3 underline">
            提供されるアメニティ・設備
          </div>
          <div className="flex flex-wrap">
            {facilityBadge(hotelFacilities.wifiEnabled, "Wi-Fi", "/Wi-Fi.svg")}
            {facilityBadge(
              hotelFacilities.parkingEnabled,
              "駐車場",
              "/駐車場.svg"
            )}
            {facilityBadge(
              hotelFacilities.couponEnabled,
              "クーポン",
              "/クーポン.svg"
            )}
            {facilityBadge(
              hotelFacilities.phoneReservationEnabled,
              "電話予約",
              "/電話予約.svg"
            )}
            {facilityBadge(
              hotelFacilities.netReservationEnabled,
              "ネット予約",
              "/ネット予約.svg"
            )}
            {facilityBadge(
              hotelFacilities.creditCardEnabled,
              "クレジットカード決済可能",
              "/クレジットカード.svg"
            )}
            {facilityBadge(
              hotelFacilities.breakfastEnabled,
              "朝食",
              "/朝食.svg"
            )}
            {facilityBadge(hotelFacilities.cookingEnabled, "料理", "/料理.svg")}
            {facilityBadge(
              hotelFacilities.tripleRoomsEnabled,
              "3人以上の利用",
              "/3人以上.svg"
            )}
            {hotelFacilities.secretPaymentEnabled && (
              <div className="flex text-base w-full my-1 md:w-1/2 md:p-3 md:mr-auto">
                <Image
                  src="/シークレットペイメント.svg"
                  width={24}
                  height={24}
                  alt="アイコン"
                />
                <div className="ml-3">入室から退室までフロントと会わない</div>
              </div>
            )}
          </div>
          <hr className="mt-5 border-t border-gray-500" />
        </div>
      </div>
      <div className="card w-full md:px-10  bg-base-100 shadow-xl">
        <div className="card-body pb-3 pt-3">
          <div className="card-title ml-1 md:text-xl mb-2">
            <span className="underline">レビューと評価</span>
            {currentUser?.id === userId ? (
              <></>
            ) : (
              <>
                <button
                  className="inline btn btn-xs btn-primary btn-active ml-auto"
                  onClick={() =>
                    currentUser
                      ? setPostReviewToggle(!postReviewToggle)
                      : router.push("/signin")
                  }
                >
                  {postReviewToggle ? "キャンセル" : "口コミを投稿する"}
                </button>
              </>
            )}
          </div>
          {currentUser && postReviewToggle ? (
            <PostReviewForm id={id} />
          ) : (
            <div className="flex md:mb-2">
              <Rating
                initialValue={averageRating}
                transition
                size={28}
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
          )}
        </div>
        {topFourReviews &&
          topFourReviews.map((review: ReviewType) => (
            <div key={review.id} className="px-8 py-2">
              {review ? (
                <>
                  <div className="flex flex-wrap">
                    <Link href={`/users/${review.userId}`} className="flex">
                      <Image
                        className="rounded-full"
                        src={review.userImage}
                        alt="アバター"
                        width={40}
                        height={40}
                        priority={true}
                      />
                      <span className="flex-none ml-2 mt-2">
                        {sliceString(`${review.userName}`, 10)}
                      </span>
                    </Link>
                  </div>
                  <div className="flex my-1">
                    <Link href={`/reivews/${review.id}`}>
                      <span className="align-middle">
                        <Rating
                          initialValue={review.fiveStarRate}
                          transition
                          size={20}
                          allowFraction
                          allowHover={false}
                          readonly={true}
                          allowTitleTag={false}
                        />{" "}
                        <span className="align-bottom">
                          {sliceString(`${review.title}`, 10)}
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="italic text-sm my-1">
                    {review.createdDate}に口コミを投稿
                  </div>
                  <div className="max-x-sm">
                    <Link href={`/reivews/${review.id}`}>
                      {sliceString(`${review.content}`, 50)}
                    </Link>
                  </div>
                </>
              ) : (
                <div className="mt-3">口コミはまだありません</div>
              )}
            </div>
          ))}
        {reviewsCount === 0 ? (
          <></>
        ) : (
          <>
            <div className="btn  btn-ghost btn-active btn-wide btn-sm  m-auto">
              <Link href={`/hotels/${id}/reviews`}>
                {reviewsCount}件の口コミを全て表示する
              </Link>
            </div>
          </>
        )}
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
        uid: ctx.req.cookies["_uid"] || undefined,
        client: ctx.req.cookies["_client"] || undefined,
        "access-token": ctx.req.cookies["_access_token"] || undefined,
      },
    });
    const hotelDetail: HotelDetailType = await res.data;
    console.log(hotelDetail);

    return {
      props: {
        ...hotelDetail,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
