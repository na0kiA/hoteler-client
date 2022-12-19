import React, { FC } from "react";
import { getAllHotel } from "../lib/allRequests";

const TopPage: FC = () => {
  const hotelList = async () => {
    try {
      const res = getAllHotel;
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return <>{hotelList}</>;
};

export default TopPage;
