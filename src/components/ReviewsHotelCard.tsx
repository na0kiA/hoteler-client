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
  console.log(createdDateByJapanese);

  return (
    <div
      className="card card-side card-compact bg-base-100 shadow-xl"
      key={props.id}
    >
      <div className="m-auto">
        <Link href={`/hotels/${props.hotelId}`}>
          <figure className="">
            {props.hotelImage ? (
              <>
                <Image
                  src={props.hotelImage}
                  alt="ホテル画像"
                  width={50}
                  height={50}
                  priority={true}
                  className="rounded-lg"
                />
              </>
            ) : (
              <>
                <Image
                  src="/hoteler_demo_photo.jpg"
                  alt="ホテル画像"
                  width={50}
                  height={50}
                  priority={true}
                  className="rounded-lg"
                />
              </>
            )}
          </figure>
          <p className="mt-1">{props.hotelName}</p>
        </Link>
      </div>
      <div className="card-body">
        <span className="align-middle text-base">
          <Rating
            initialValue={props.fiveStarRate}
            transition
            size={20}
            allowFraction
            allowHover={false}
            readonly={true}
            allowTitleTag={false}
          />
          <span className="align-bottom"> ({props.fiveStarRate})</span>
        </span>
        <span className="align-bottom">
          <>{createdDateByJapanese(props.createdAt)}に作成</>
        </span>
        <h2 className="card-title">
          <span className="align-middle text-base">{props.title}</span>
        </h2>
        <p className="text-xs pt-0">{props.content}</p>
      </div>
    </div>
  );
};

export default memo(ReviewsHotelCard);
