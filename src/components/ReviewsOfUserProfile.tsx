import React, { memo, useCallback, useMemo } from "react";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Link from "next/link";

import { useAuthStateContext } from "context/AuthProvider";
import { ReviewType } from "types/types";
import { deleteReview } from "lib/reviews";

type PROPS = {
  props: ReviewType;
};

const ReviewsOfUserProfile = memo(({ props }: PROPS) => {
  console.log("ユーザー詳細の口コミ一覧コンポーネントが呼ばれたよ");

  const sliceReviewContent = useCallback((content: string) => {
    if (content.length > 15) {
      return content.slice(0, 15).concat("…");
    } else {
      return content;
    }
  }, []);

  return (
    <>
      {/* スマホ */}
      <div className="md:hidden card card-side bg-base-100 shadow-xl">
        <div className="m-auto pl-3 pt-5">
          <Link href={`/hotels/${props.hotelId}`}>
            <Image
              className="rounded-lg  m-auto"
              src="/hoteler_demo_photo.jpg"
              alt="ホテル画像"
              width={100}
              height={100}
              priority={true}
            />
            <p className="m-auto">{props.hotelName}</p>
            <p className="text-ssm m-auto">{props.hotelFullAddress}</p>
          </Link>
          <span className="align-bottom">
            <Rating
              initialValue={props.hotelAverageRating}
              transition
              size={15}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
          </span>
          <span className="text-ssm align-middle">
            {props.hotelReviewsCount}件
          </span>
        </div>
        <div className="flex-1 p-5 pb-1">
          <div className="">
            <Rating
              initialValue={props.fiveStarRate}
              transition
              size={20}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
            <span className="align-bottom">({props.fiveStarRate})</span>
          </div>
          <p className="text-xs mt-1">
            <>{props.createdDate}に作成</>
          </p>
          <h2 className="card-title text-base mt-1 mb-1 md:text-xl">
            {props.title}
          </h2>
          <p className="card-title text-xs md:text-base">
            {sliceReviewContent(props.content)}
          </p>
          <div className="justify-start">
            <Link
              href={`/reviews/${props.id}`}
              className="text-xs text-blue-link"
            >
              口コミ全文を表示する
            </Link>
            <p className="text-xs">
              <span className="text-sm"> {props.helpfulnessesCount}</span>
              人が参考になった
            </p>
          </div>
        </div>
      </div>

      {/* PC */}
      <div className="hidden md:block md:card md:card-side md:bg-base-100 md:shadow-xl">
        <div className="m-auto pl-3 pt-5">
          <Link href={`/hotels/${props.hotelId}`}>
            <Image
              className="rounded-lg  m-auto"
              src="/hoteler_demo_photo.jpg"
              alt="ホテル画像"
              width={300}
              height={300}
              priority={true}
            />
            <div className="flex-1 text-lg font-bold">{props.hotelName}</div>
            <p className="text-xs m-auto">{props.hotelFullAddress}</p>
          </Link>
          <div className="m-auto">
            <Rating
              initialValue={props.hotelAverageRating}
              transition
              size={20}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />{" "}
            <span className="align-middle text-base">
              ({props.hotelAverageRating}){" "}
              <Link
                href={`/hotel/${props.id}/reviews`}
                className="text-blue-link text-sm"
              >
                {props.hotelReviewsCount}件
              </Link>
            </span>
          </div>
        </div>
        <div className="flex-1 p-5 pb-1">
          <div className="">
            <Rating
              initialValue={props.fiveStarRate}
              transition
              size={30}
              allowFraction
              allowHover={false}
              readonly={true}
              allowTitleTag={false}
            />
            <span className="text-xl align-middle">({props.fiveStarRate})</span>
          </div>
          <p className="text-base mt-1">
            <>{props.createdDate}に作成</>
          </p>
          <h2 className="card-title text-base mt-1 mb-1 md:text-xl">
            {props.title}
          </h2>
          <p className="card-title text-base md:text-base">{props.content}</p>
          <div className="justify-start mt-1">
            <Link
              href={`/reviews/${props.id}`}
              className="text-sm text-blue-link"
            >
              口コミ詳細を表示する
            </Link>
            <p className="text-sm mt-1">
              <span className="text-base"> {props.helpfulnessesCount}</span>
              人のお客様がこれが役に立ったと考えています
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default ReviewsOfUserProfile;
