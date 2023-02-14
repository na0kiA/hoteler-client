import React, { memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { ReviewType } from "types/types";

type PROPS = {
  props: ReviewType[];
};

const ReviewsOfUserProfile = memo(({ props }: PROPS) => {
  console.log("ユーザー詳細の口コミ一覧コンポーネントが呼ばれたよ");

  const sliceReviewContent = (content: string, maxLength: number) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength).concat("…");
    } else {
      return content;
    }
  };

  return (
    <div className="shadow-xl md:ml-auto">
      {props.map((review) => (
        <div key={review.id} className="flex m-auto p-3">
          <div className="mt-3">
            <Link href={`/hotels/${review.hotelId}`}>
              <Image
                className="md:hidden rounded-lg"
                src={
                  review.hotelImage ? review.hotelImage : "/noImageHotel.png"
                }
                alt="ホテル画像"
                width={100}
                height={100}
                priority={true}
              />
              <Image
                className="hidden md:block rounded-lg"
                src={
                  review.hotelImage ? review.hotelImage : "/noImageHotel.png"
                }
                alt="ホテル画像"
                priority={true}
                width={150}
                height={150}
                style={{ objectFit: "cover" }}
              />
              <p className="m-auto">{review.hotelName}</p>
              <p className="text-ssm m-auto">{review.hotelFullAddress}</p>
            </Link>
            <div className="">
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
                <span className="text-ssm mt-1 ml-1">
                  {review.hotelReviewsCount}件
                </span>
              </div>
            </div>
          </div>

          {/* 右側の口コミ詳細 */}
          <div className="flex-1 ml-3 mt-1">
            <div className="m-auto">
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
            <p className="md:hidden card-title text-xs">
              {sliceReviewContent(review.content, 15)}
            </p>
            <p className="hidden md:block card-title text-base">
              {sliceReviewContent(review.content, 280)}
            </p>
            <div className="justify-start">
              <Link
                href={`/reviews/${review.id}`}
                className="text-xs text-blue-link"
              >
                口コミ全文を表示する
              </Link>
              <p className="text-xs">
                <span className="text-sm">{review.helpfulnessesCount}</span>
                人が参考になった
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ReviewsOfUserProfile;
