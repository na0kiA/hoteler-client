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

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Facilities = () => {
  const { id } = useHotelFormStateContext();
  return (
    <>
      <Navbar />
      <HotelUploadImages />
      <HotelFormProvider>
        <FacilitiesForm />
        <Link href={`/hotels/${id}`} className="link md:text-lg">
          今はスキップ
        </Link>
      </HotelFormProvider>
    </>
  );
};

export default Facilities;
