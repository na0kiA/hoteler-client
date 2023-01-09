import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { ReviewType } from "types/types";

type PROPS = {
  props: ReviewType;
};

const ReviewsHotelCard = ({ props }: PROPS) => {
  return (
    <div>
      <div
        className="card card-side card-compact bg-base-100 shadow-xl"
        key={props.id}
      >
        <figure>
          {props.hotelImage ? (
            <>
              <Image
                src={props.hotelImage}
                alt="ホテル画像"
                width={50}
                height={50}
                priority={true}
              />
            </>
          ) : (
            <Image
              src="/hoteler_demo_photo.jpg"
              alt="ホテル画像"
              width={50}
              height={50}
              priority={true}
            />
          )}
        </figure>
        <div className="card-body p-0">
          <h2 className="card-title">
            <span className="align-middle">{props.hotelName}</span>
            <span className="align-middle text-sm">
              <Rating
                initialValue={props.hotelAverageRating}
                transition
                size={20}
                allowFraction
                allowHover={false}
                readonly={true}
                allowTitleTag={false}
              />
            </span>
            <span className="align-bottom text-sm">
              ({props.hotelAverageRating}) {props.hotelReviewsCount}件
            </span>
          </h2>
          <h3 className="text-sm font-sans font-thin italic">
            {props.hotelFullAddress}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ReviewsHotelCard;
