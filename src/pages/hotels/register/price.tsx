import React from "react";
import Link from "next/link";
import HotelRateTable from "components/HotelRateTable";
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
          <span className="text-xs">特別期間</span>
        </li>
        <li className="step">
          <span className="text-xs">設備設定</span>
        </li>
      </ul>
      <HotelRateTable />
      <Link
        href={"/hotels/register/special-periods"}
        className="link md:text-lg"
      >
        今はスキップ
      </Link>
    </Layout>
  );
};

export default Price;
