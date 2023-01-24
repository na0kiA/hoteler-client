import HotelFormInput from "components/HotelFormInput";
import Navbar from "components/Navbar";
import { AuthContext } from "context/AuthProvider";
import { HotelFormProvider } from "context/HotelFormProvider";
import { withAuthServerSideProps } from "lib/auth";
import { createHotel } from "lib/hotels";
import React, { createContext, useState } from "react";
import { HotelCreateType } from "types/types";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Home = () => {
  return (
    <>
      <Navbar />
      <ul className="steps steps-horizontal flex justify-center text-lg">
        <li className="step step-primary">
          <span className="text-xs">詳細設定</span>
        </li>
        <li className="step">
          <span className="text-xs">料金設定</span>
        </li>
        <li className="step ">
          <span className="text-xs">設備設定</span>
        </li>
      </ul>
      <HotelFormProvider>
        <HotelFormInput />
      </HotelFormProvider>
    </>
  );
};

export default Home;
