import React, { memo, useCallback } from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { ReviewType } from "types/types";
import Link from "next/link";

type PROPS = {
  props: ReviewType;
};

const ReviewsHotelCard = ({ props }: PROPS) => {
  const createdDateByJapanese = useCallback((date: Date) => {
    const yearAndMonthAndDays = date.toString().slice(0, 10);
    return `${yearAndMonthAndDays.slice(0, 4)}年${yearAndMonthAndDays.slice(
      6,
      7
    )}月${yearAndMonthAndDays.slice(8, 10)}日`;
  }, []);

  const sliceReviewContent = useCallback((content: string) => {
    if (content.length > 15) {
      return content.slice(0, 15).concat("…");
    } else {
      return content;
    }
  }, []);

  return (
    <div className="flex card card-side bg-base-100 shadow-xl">
      <div className="flex-none m-auto pl-3">
        <Image
          className="rounded-lg"
          src="/hoteler_demo_photo.jpg"
          alt="ホテル画像"
          width={100}
          height={100}
          priority={true}
        />
        <a className="m-auto">{props.hotelName}</a>
      </div>
      <div className="card-body flex-1 p-5 pb-1">
        <div className="pt-5">
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
        <p className="text-xs">
          <>{createdDateByJapanese(props.createdAt)}に作成</>
        </p>
        <h2 className="card-title text-base">{props.title}</h2>
        <p className="card-title text-xs">
          {sliceReviewContent(props.content)}
        </p>
        <div className="card-actions justify-start">
          <Link
            href={`/users/reviews/${props.id}`}
            className="text-xs text-blue-link"
          >
            口コミ全文を表示する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(ReviewsHotelCard);
