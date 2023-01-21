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
      <HotelFormProvider>
        <HotelFormInput />
      </HotelFormProvider>
    </>
  );
};

export default Home;
