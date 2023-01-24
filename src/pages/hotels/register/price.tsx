import React, { createContext, useState } from "react";
import Link from "next/link";
import HotelRestRateTable from "components/HotelRestRateTable";
import Navbar from "components/Navbar";
import { HotelFormProvider } from "context/HotelFormProvider";
import { withAuthServerSideProps } from "lib/auth";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Price = () => {
  return (
    <>
      <Navbar />
      <HotelFormProvider>
        <HotelRestRateTable />
      </HotelFormProvider>
      <Link href={"/hotels/register/facilities"} className="link md:text-lg">
        今はスキップ
      </Link>
    </>
  );
};

export default Price;
