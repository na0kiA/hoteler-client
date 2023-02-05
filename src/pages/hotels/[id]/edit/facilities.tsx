import Layout from "components/Layout";
import client from "lib/client";
import Link from "next/link";
import React from "react";
import { HotelEditType } from "types/types";

const Facilities = ({ name, id }: HotelEditType) => {
  return (
    <Layout title={`${name}の設備編集ページ`}>
      <div className="flex justify-center mt-3">
        <div className="tabs">
          <Link
            href={`/hotels/${id}/edit`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            詳細
          </Link>
          <Link
            href={`/hotels/${id}/rate`}
            className="tab tab-md md:tab-lg  tab-bordered"
          >
            料金
          </Link>
          <div className="tab tab-md md:tab-lg tab-bordered tab-active">
            設備
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Facilities;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const [hotelDetail, currentUser]: any = await Promise.all([
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
    ]);
    if (currentUser.data.data.id === hotelDetail.data.userId) {
      return {
        props: {
          ...hotelDetail.data,
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
