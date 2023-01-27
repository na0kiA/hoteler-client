import React, { createContext, useState } from "react";
import Link from "next/link";
import HotelRestRateTable from "components/HotelRestRateTable";
import Navbar from "components/Navbar";
import { HotelFormProvider } from "context/HotelFormProvider";
import { withAuthServerSideProps } from "lib/auth";
import Layout from "components/Layout";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Price = () => {
  return (
    <Layout title="ホテル料金設定ページ">
      <ul className="steps steps-horizontal flex justify-center text-lg">
        <li className="step">
          <span className="text-xs">詳細設定</span>
        </li>
        <li className="step step-primary">
          <span className="text-xs">料金設定</span>
        </li>
        <li className="step">
          <span className="text-xs">設備設定</span>
        </li>
      </ul>
      <HotelFormProvider>
        <HotelRestRateTable />
      </HotelFormProvider>
      <Link href={"/hotels/register/facilities"} className="link md:text-lg">
        今はスキップ
      </Link>
    </Layout>
  );
};

export default Price;
