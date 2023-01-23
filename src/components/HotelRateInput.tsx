import React from "react";
import HotelRestRateTable from "./HotelRestRateTable";

type RateType = {
  plan?: string;
  rate: number;
  startTime: number;
  endTime: number;
};

const HotelRateInput = () => {
  return (
    <>
      <HotelRestRateTable />
    </>
  );
};

export default HotelRateInput;
