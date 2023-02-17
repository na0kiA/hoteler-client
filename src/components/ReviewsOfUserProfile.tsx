import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { ReviewType } from "types/types";

type PROPS = {
  props: ReviewType[];
};

const ReviewsOfUserProfile = memo(function reviewOfUserProfile({
  props,
}: PROPS) {
  console.log("ユーザー詳細の口コミ一覧コンポーネントが呼ばれたよ");

  const sliceReviewContent = (content: string, maxLength: number) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength).concat("…");
    } else {
      return content;
    }
  };

  return (
    <div className="shadow-xl md:p-3">
      {props.map((review) => (
        <div key={review.id}>
          {/* スマホ */}
          <div className="md:hidden card card-side bg-base-100 shadow-xl">
            <div className="m-auto pl-3 pt-5">
              <Link href={`/hotels/${review.hotelId}`}>
                <Image
                  className="rounded-lg  m-auto"
                  src={
                    review.hotelImage ? review.hotelImage : "/noImageHotel.png"
                  }
                  alt="ホテル画像"
                  width={100}
                  height={100}
                  priority={true}
                />
                <p className="m-auto">{review.hotelName}</p>
                <p className="text-ssm m-auto">{review.hotelFullAddress}</p>
              </Link>
              <div className="flex">
                <Rating
                  initialValue={review.hotelAverageRating}
                  transition
                  size={15}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                  className="bottom-1"
                />
                <span className="text-ssm align-middle mt-1">
                  {review.hotelReviewsCount}件
                </span>
              </div>
            </div>
            <div className="flex-1 p-3">
              <div className="">
                <Rating
                  initialValue={review.fiveStarRate}
                  transition
                  size={20}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                />
                <span className="align-bottom">({review.fiveStarRate})</span>
              </div>
              <p className="text-xs mt-1">
                <>{review.createdDate}に作成</>
              </p>
              <h2 className="card-title text-base mt-1 mb-1 md:text-xl">
                {review.title}
              </h2>
              <p className="card-title text-xs md:text-base">
                {sliceReviewContent(review.content, 15)}
              </p>
              <div className="justify-start">
                <Link
                  href={`/reviews/${review.id}`}
                  className="text-xs text-blue-link"
                >
                  口コミ全文を表示する
                </Link>
                <p className="text-xs">
                  <span className="text-sm"> {review.helpfulnessesCount}</span>
                  人が参考になった
                </p>
              </div>
            </div>
          </div>

          {/* PC */}
          <div className="hidden md:block md:card md:card-side md:bg-base-100 md:shadow-xl md:p-3">
            <div className="m-auto pl-3 pt-5">
              <Link href={`/hotels/${review.hotelId}`}>
                <Image
                  className="rounded-lg  m-auto"
                  src={
                    review.hotelImage ? review.hotelImage : "/noImageHotel.png"
                  }
                  alt="ホテル画像"
                  width={200}
                  height={200}
                  priority={true}
                />
                <div className="flex-1 text-lg font-bold">
                  {review.hotelName}
                </div>
                <p className="text-xs m-auto">{review.hotelFullAddress}</p>
              </Link>
              <div className="m-auto">
                <Rating
                  initialValue={review.hotelAverageRating}
                  transition
                  size={20}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                />{" "}
                <span className="align-middle text-base">
                  ({review.hotelAverageRating}){" "}
                  <Link
                    href={`/hotel/${review.id}/reviews`}
                    className="text-blue-link text-sm"
                  >
                    {review.hotelReviewsCount}件
                  </Link>
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 pb-1">
              <div className="">
                <Rating
                  initialValue={review.fiveStarRate}
                  transition
                  size={30}
                  allowFraction
                  allowHover={false}
                  readonly={true}
                  allowTitleTag={false}
                />
                <span className="text-xl align-middle">
                  ({review.fiveStarRate})
                </span>
              </div>
              <p className="text-base mt-1">
                <>{review.createdDate}に作成</>
              </p>
              <h2 className="card-title font-bold text-base mt-1 mb-1 md:text-xl">
                {review.title}
              </h2>
              <p className="card-title text-sm md:text-base">
                {sliceReviewContent(review.content, 280)}
              </p>
              <div className="justify-start mt-1">
                <Link
                  href={`/reviews/${review.id}`}
                  className="text-sm text-blue-link"
                >
                  口コミ詳細を表示する
                </Link>
                <p className="text-sm mt-1">
                  <span className="text-base">
                    {" "}
                    {review.helpfulnessesCount}
                  </span>
                  人のお客様がこれが役に立ったと考えています
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ReviewsOfUserProfile;
