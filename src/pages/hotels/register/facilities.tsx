import React from "react";
import FacilitiesForm from "components/FacilitiesForm";
import Navbar from "components/Navbar";
import {
  HotelFormProvider,
  useHotelFormStateContext,
} from "context/HotelFormProvider";
import { withAuthServerSideProps } from "lib/auth";
import HotelUploadImages from "components/HotelUploadImages";
import Link from "next/link";
import Cookies from "js-cookie";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Facilities = () => {
  const id = Cookies.get("_hotel_id");
  return (
    <>
      <Navbar />
      <ul className="steps steps-horizontal flex justify-center text-lg">
        <li className="step">
          <span className="text-xs">詳細設定</span>
        </li>
        <li className="step">
          <span className="text-xs">料金設定</span>
        </li>
        <li className="step  step-primary">
          <span className="text-xs">設備設定</span>
        </li>
      </ul>
      {/* <div className="m-auto"> */}
      <HotelFormProvider>
        <HotelUploadImages />
        <FacilitiesForm id={id} />
      </HotelFormProvider>
      {/* </div> */}
    </>
  );
};

export default Facilities;
