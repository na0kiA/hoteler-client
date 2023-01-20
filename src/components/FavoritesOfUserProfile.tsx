import React, { memo } from "react";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Link from "next/link";
import { UserFavoritesType } from "types/types";

type PROPS = {
  props: UserFavoritesType;
};

const FavoritesOfUserProfile = memo(({ props }: PROPS) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="m-auto pl-3 pt-5">
        <Link href={`/hotels/${props.hotelId}`}>
          <Image
            className="rounded-lg"
            src="/hoteler_demo_photo.jpg"
            alt="ホテル画像"
            width={100}
            height={100}
            priority={true}
          />
        </Link>
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
          <span className="align-middle text-sm">
            ({props.fiveStarRate}){" "}
            <Link
              href={`/hotel/${props.id}/reviews`}
              className="text-blue-link"
            >
              {props.hotelReviewsCount}件
            </Link>
          </span>
        </div>
        <h2 className="card-title text-base mt-1 mb-1">{props.hotelName}</h2>
        <h3 className="text-ssm m-auto">{props.hotelFullAddress}</h3>
      </div>
    </div>
  );
});

export default FavoritesOfUserProfile;
