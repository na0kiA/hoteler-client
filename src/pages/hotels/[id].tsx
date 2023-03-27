import React, { useRef, useState } from "react";
import Image from "next/image";

import { HotelDetailType, ReviewType } from "types/types";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import client from "lib/client";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import PostReviewForm from "components/PostReviewForm";
import { useAuthStateContext } from "context/AuthProvider";
import { deleteFavorite, postFavorite, updateHotel } from "lib/hotels";

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
  topFourReviews,
  prefecture,
  city,
  streetAddress,
  name,
  id,
  userId,
  accepted,
  isFavoriteOrNot,
}: HotelDetailType & { isFavoriteOrNot: boolean }) => {
  const { currentUser } = useAuthStateContext();
  const router = useRouter();
  const [postReviewToggle, setPostReviewToggle] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteOrNot);
  const [editFull] = useState<boolean>(full);
  const [, setError] = useState<boolean>(false);
  const facilityBadge = (
    facility: boolean,
    property: string,
    imageSrc: string
  ) => {
    return (
      facility && (
        <div className="flex text-base w-full my-1 md:w-1/2 md:p-3 mr-auto">
          <Image src={imageSrc} width={24} height={24} alt="アイコン" />
          <div className="ml-3">{property}</div>
        </div>
      )
    );
  };

  const hotelImageViews = (
    srcIndex: number,
    className: string = "w-full",
    alt: string = "ホテル画像"
  ) => {
    return (
      <Image
        src={
          hotelImages && hotelImages[srcIndex]?.fileUrl
            ? hotelImages[srcIndex]?.fileUrl
            : "/noImageHotel.png"
        }
        placeholder="blur"
        blurDataURL={"/loading_image.svg"}
        className={className}
        width={600}
        height={600}
        alt={alt}
        priority={true}
        style={{ objectFit: "cover" }}
      />
    );
  };

  const sliceString = (content: string, point: number) => {
    if (content.length > point) {
      return content.slice(0, point).concat("…");
    } else {
      return content;
    }
  };

  const buttonRef = useRef(false);

  const handlePostOrDeleteFavorite = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFavorite: boolean
  ) => {
    event.preventDefault();

    if (buttonRef.current) return;
    buttonRef.current = true;

    try {
      if (isFavorite) {
        await deleteFavorite(id);
        setIsFavorite(false);
      } else {
        await postFavorite(id);
        setIsFavorite(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        setError(error.response?.data.errors);
      } else {
        console.log(error);
      }
    } finally {
      buttonRef.current = false;
    }
  };
  const handleChangeFull = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(editFull);
    const onlyUpdateFullParams: any = {
      content,
      company,
      phone_number: phoneNumber,
      postal_code: postalCode,
      full_address: fullAddress,
      full: !editFull,
      name,
      prefecture,
      city,
      street_address: streetAddress,
    };
    try {
      const res = await updateHotel(id, onlyUpdateFullParams);
      if (res.status === 200) {
        router.reload();
      }
    } catch (error: any) {
      if (error.response.data) {
        setError(error.response.data);
      }
      console.log(error);
    }
  };

  return (
    <Layout title={`${name}のホテル詳細ページ`}>
      <div className="card p-8 md:w-full md:h-full md:py-5 md:px-20 bg-base-100 shadow-xl">
        {currentUser && currentUser.id === userId ? (
          <div className="flex md:ml-auto  gap-3 mb-3">
            <button
              className={
                full
                  ? "btn btn-sm btn-accent text-base ml-auto"
                  : "btn btn-sm btn-secondary text-base ml-auto"
              }
              onClick={(e) => {
                handleChangeFull(e);
              }}
            >
              {full ? (
                <div className="flex-wrap">空室に切り替える</div>
              ) : (
                <div className="flex-wrap">満室に切り替える</div>
              )}
            </button>
            <button
              className="btn btn-sm btn-primary btn-active ml-auto"
              onClick={() => router.push(`/hotels/${id}/edit`)}
            >
              ホテルを編集する
            </button>
          </div>
        ) : (
          <button
            className="flex ml-auto mb-2 btn btn-sm gap-1 btn-outline text-sm"
            onClick={(e) => {
              currentUser
                ? handlePostOrDeleteFavorite(e, isFavorite)
                : router.push("/signin");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isFavorite ? "削除" : "保存"}
          </button>
        )}

        {/* スマホのホテル画像 */}
        <figure className="md:hidden h-3/4">
          <div className="md:hidden carousel rounded-box">
            <div className="carousel-item w-full">
              {hotelImageViews(0, "サムネイル画像")}
            </div>
            <div className="carousel-item w-full">{hotelImageViews(1)}</div>
            <div className="carousel-item w-full">{hotelImageViews(2)}</div>
            <div className="carousel-item w-full">{hotelImageViews(3)}</div>
            <div className="carousel-item w-full">{hotelImageViews(4)}</div>
          </div>
        </figure>

        {/* PCのホテル画像 */}
        <div className="hidden md:flex">
          {hotelImageViews(
            0,
            "flex lg:w-11/12 md:w-6/12  rounded-lg p-1",
            "サムネイル画像"
          )}
          <div className="flex flex-wrap items-stretch">
            {hotelImageViews(1, "w-1/2 h-1/2 rounded-lg p-1")}
            {hotelImageViews(2, "w-1/2 h-1/2 rounded-lg p-1")}
            {hotelImageViews(3, "w-1/2 h-1/2 rounded-lg p-1")}
            {hotelImageViews(4, "w-1/2 h-1/2 rounded-lg p-1")}
          </div>
        </div>

        <Link className="link ml-auto text-xs" href={`/hotels/${id}/images`}>
          全ての写真を表示
        </Link>
        <div>
          {currentUser && currentUser.id === userId ? (
            <>
              <button className="flex btn btn-active btn-sm gap-2 mt-5 ml-auto">
                お気に入り
                <div className="badge badge-secondary">{favoritesCount}件</div>
              </button>
              {accepted ? (
                <span className="text-sm badge">承認済みホテル</span>
              ) : (
                <span className="text-sm badge">未承認ホテル</span>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <h1 className="flex mt-3">
          <div className="text-3xl font-bold mb-1">{name}</div>
          <div
            className={
              full
                ? "flex ml-auto btn btn-sm btn-active btn-secondary text-base"
                : "flex ml-auto btn btn-sm btn-active btn-accent text-base"
            }
          >
            {full ? "満室" : "空室"}
          </div>
        </h1>
        <p className="text-sm italic">〒 {postalCode}</p>
        <p className="mb-3 italic">{fullAddress}</p>
        <p className="italic">☎ {phoneNumber}</p>
        <p className="text-lg italic mb-3">{company}</p>
        <p className="whitespace-pre-wrap">{content}</p>
        <hr className="mt-10 border-t border-gray-500" />
      </div>

      {/* アメニティと設備 */}
      <div className="card w-full md:px-10  bg-base-100 shadow-xl">
        <div className="card-body md:pb-3">
          <div className="card-title md:ml-3 underline">
            提供されるアメニティ・設備
          </div>
          <div className="flex flex-wrap">
            {facilityBadge(hotelFacilities?.wifiEnabled, "Wi-Fi", "/Wi-Fi.svg")}
            {facilityBadge(
              hotelFacilities?.parkingEnabled,
              "駐車場",
              "/駐車場.svg"
            )}
            {facilityBadge(
              hotelFacilities?.couponEnabled,
              "クーポン",
              "/クーポン.svg"
            )}
            {facilityBadge(
              hotelFacilities?.phoneReservationEnabled,
              "電話予約",
              "/電話予約.svg"
            )}
            {facilityBadge(
              hotelFacilities?.netReservationEnabled,
              "ネット予約",
              "/ネット予約.svg"
            )}
            {/* カードのSVGファイルが本番環境でなぜか表示できなかったのでコードに変更 */}
            {hotelFacilities?.secretPaymentEnabled && (
              <div className="flex text-base w-full my-1 md:w-1/2 md:p-3 md:m-auto">
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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <div className="ml-3">クレジットカード</div>
              </div>
            )}
            {facilityBadge(
              hotelFacilities?.breakfastEnabled,
              "朝食",
              "/朝食.svg"
            )}
            {facilityBadge(
              hotelFacilities?.cookingEnabled,
              "料理",
              "/料理.svg"
            )}
            {facilityBadge(
              hotelFacilities?.tripleRoomsEnabled,
              "3人以上の利用",
              "/3人以上.svg"
            )}
            {hotelFacilities?.secretPaymentEnabled && (
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
                  href={`/hotels/${id}/reviews`}
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
                    <Link href={`/reviews/${review.id}`}>
                      <span className="align-middle">
                        <Rating
                          initialValue={review.fiveStarRate}
                          transition
                          size={20}
                          allowFraction
                          allowHover={false}
                          readonly={true}
                          allowTitleTag={false}
                        />
                        <span className="align-bottom ml-2 font-bold">
                          {sliceString(`${review.title}`, 10)}
                        </span>
                      </span>
                    </Link>
                  </div>
                  <div className="italic text-sm my-1">
                    {review.createdDate}に口コミを投稿
                  </div>
                  <div className="max-x-sm">
                    {sliceString(`${review.content}`, 50)}
                    <Link href={`/reviews/${review.id}`}>
                      <span className="text-blue-link text-sm align-middle ml-2 font-bold">
                        続きを読む
                      </span>
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
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=10"
  );

  const { id } = ctx.query;

  try {
    const [hotelDetailResponse, favoriteOrNot]: any = await Promise.allSettled([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid || null,
          client: ctx.req.cookies._client || null,
          "access-token": ctx.req.cookies._access_token || null,
        },
      }),
      client.get(`/hotels/${id}/favorites`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies._uid || null,
          client: ctx.req.cookies._client || null,
          "access-token": ctx.req.cookies._access_token || null,
        },
      }),
    ]);

    const hotelDetail: HotelDetailType = await hotelDetailResponse?.value?.data
      ?.hotel;

    if (favoriteOrNot.status === "rejected") {
      return {
        props: {
          ...hotelDetail,
          isFavoriteOrNot: false,
        },
      };
    }

    const isFavoriteOrNot: boolean = favoriteOrNot.value.data.favorite;

    if (!hotelDetail) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...hotelDetail,
        isFavoriteOrNot,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
