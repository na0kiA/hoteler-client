import React from "react";
import ReactStarsRating from "react-awesome-stars-rating";

const onChange = (value: number) => {
  console.log(`React Stars Rating value is ${value}`);
};

const StarsRating = ({ value }: any) => {
  return <ReactStarsRating onChange={onChange} value={value} />;
};

export default StarsRating;
