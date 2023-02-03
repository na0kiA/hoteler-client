import React, { memo, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { createHotel, getDays } from "lib/hotels";
import { HotelCreateType, HotelDetailType, ServiceRateType } from "types/types";
import { useForm, useFormState } from "react-hook-form";
import Cookies from "js-cookie";
import HotelFormInput from "./HotelFormInput";
import HotelRateTable from "./HotelRateTable";
import Layout from "./Layout";
import { getRestRates, getStayRates } from "lib/hotelRate";

const HotelEdit = memo(
  ({
    name,
    content,
    company,
    city,
    prefecture,
    postalCode,
    streetAddress,
    phoneNumber,
  }: HotelDetailType) => {
    // const [serviceList, setServiceList] = useState<ServiceRateType[][]>([]);

    // useEffect(() => {
    //   getServiceList();
    // }, [setServiceList]);

    return (
      <>
        {/* <HotelRateTable id={id} serviceList={serviceList} /> */}
        <HotelFormInput
          name={name}
          content={content}
          company={company}
          city={city}
          prefecture={prefecture}
          postalCode={postalCode}
          streetAddress={streetAddress}
          phoneNumber={phoneNumber}
        />
      </>
    );
  }
);

export default HotelEdit;
