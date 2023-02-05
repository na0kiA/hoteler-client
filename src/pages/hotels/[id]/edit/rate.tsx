import HotelRateTable from "components/HotelRateTable";
import Layout from "components/Layout";
import client from "lib/client";
import { getServiceList } from "lib/hotelRate";
import Link from "next/link";
import React from "react";
import { HotelEditType } from "types/types";

const Rate = ({ name, id, serviceList }: HotelEditType) => {
  // console.log(serviceList);

  return (
    <Layout title={`${name}の料金編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            className="tab tab-md md:tab-lg tab-bordered tab-active"
            href={`/hotels/${id}/edit`}
          >
            詳細
          </Link>
          <div className="tab tab-md md:tab-lg tab-active">料金</div>
          <Link
            href={`/hotels/${id}/facilities`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            設備
          </Link>
        </div>
      </div>
      <HotelRateTable id={id} serviceList={serviceList} />
    </Layout>
  );
};

export default Rate;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const [hotelDetail, currentUser, serviceList]: any = await Promise.all([
      client.get(`/hotels/${id}`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
      client.get(`/auth/sessions`, {
        headers: {
          "Content-Type": "application/json",
          uid: ctx.req.cookies["_uid"],
          client: ctx.req.cookies["_client"],
          "access-token": ctx.req.cookies["_access_token"],
        },
      }),
      getServiceList(
        id,
        ctx.req.cookies["_access_token"],
        ctx.req.cookies["_client"],
        ctx.req.cookies["_uid"]
      ),
    ]);
    if (currentUser.data.data.id === hotelDetail.data.userId) {
      return {
        props: {
          ...hotelDetail.data,
          serviceList,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
