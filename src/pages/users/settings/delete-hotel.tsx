import HotelOfUserProfile from "components/HotelOfUserProfile";
import Layout from "components/Layout";
import client from "lib/client";
import { GetServerSideProps } from "next";
import React from "react";
import { HotelDetailType, UserDetailType } from "types/types";

type PROPS = {
  hotels: HotelDetailType[];
};
const DeleteHotel = ({ hotels }: PROPS) => {
  return (
    <Layout title={"ホテルを削除する"}>
      <HotelOfUserProfile props={hotels} />
    </Layout>
  );
};

export default DeleteHotel;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const currentUser = await client.get(`/auth/sessions`, {
    headers: {
      "Content-Type": "application/json",
      uid: ctx.req.cookies._uid || null,
      client: ctx.req.cookies._client || null,
      "access-token": ctx.req.cookies._access_token || null,
    },
  });

  const id = currentUser.data.data.id;

  const userShow = await client.get(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      uid: ctx.req.cookies._uid,
      client: ctx.req.cookies._client,
      "access-token": ctx.req.cookies._access_token,
    },
  });

  const userDetail: UserDetailType = userShow.data.user;

  if (!userDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...userDetail,
    },
  };
};
