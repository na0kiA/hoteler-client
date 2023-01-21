import FormInput from "components/FormInput";
import Navbar from "components/Navbar";
import { AuthContext } from "context/AuthProvider";
import { HotelFormProvider } from "context/HotelFormProvider";
import { withAuthServerSideProps } from "lib/auth";
import { createHotel } from "lib/hotels";
import React, { createContext, useState } from "react";
import { HotelCreateType } from "types/types";

// export const getServerSideProps = withAuthServerSideProps(
//   "/auth/sessions",
//   true
// );

const register = () => {
  return (
    <>
      <Navbar />
      <HotelFormProvider>
        <FormInput />
      </HotelFormProvider>
    </>
  );
};

export default register;
