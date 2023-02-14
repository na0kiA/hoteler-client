import React from "react";
import HotelFormInput from "components/HotelFormInput";
import Layout from "components/Layout";
import { HotelFormProvider } from "context/HotelFormProvider";
import { withAuthServerSideProps } from "lib/auth";
import SpecialPeriodForm from "components/SpecialPeriodForm";
import Link from "next/link";

export const getServerSideProps = withAuthServerSideProps(
  "/auth/sessions",
  true
);

const Home = () => {
  return (
    <Layout title="ホテル登録ページ">
      <ul className="steps steps-horizontal flex justify-center text-lg">
        <li className="step step-primary">
          <span className="text-xs">詳細設定</span>
        </li>
        <li className="step">
          <span className="text-xs">料金設定</span>
        </li>
        <li className="step step-primary">
          <span className="text-xs">特別期間</span>
        </li>
        <li className="step ">
          <span className="text-xs">設備設定</span>
        </li>
      </ul>
      <HotelFormProvider>
        <SpecialPeriodForm />
      </HotelFormProvider>
      <Link href={"/hotels/register/facilities"} className="link md:text-lg">
        今はスキップ
      </Link>
    </Layout>
  );
};

export default Home;
