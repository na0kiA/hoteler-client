import Link from "next/link";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { HotelListType } from "types/types";

type PROPS = {
  props: HotelListType;
};

const StarsRating = ({ props }: PROPS) => {
  return (
    <>
      <Rating
        initialValue={props.averageRating}
        transition
        size={20}
        allowFraction
        allowHover={false}
        readonly={true}
        allowTitleTag={false}
      />
      <span className="align-middle text-sm">
        ({props.averageRating}){" "}
        <Link href={`/hotels/${props.id}/reviews`} className="text-blue-link">
          {props.reviewsCount}件
        </Link>
      </span>
    </>
  );
};

export default StarsRating;
