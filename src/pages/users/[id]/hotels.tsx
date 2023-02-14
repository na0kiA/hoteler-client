import React from "react";
import Link from "next/link";

import {
  HotelDetailType,
  UserDetailType,
  UserFavoritesType,
} from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import Layout from "components/Layout";
import FavoritesOfUserProfile from "components/FavoritesOfUserProfile";
import client from "lib/client";
import UpdateUserProfile from "components/UpdateUserProfile";
import HotelOfUserProfile from "components/HotelOfUserProfile";
import { GetServerSideProps } from "next";

const UserHotels = ({
  id,
  name,
  image,
  uid,
  hotelsCount,
  hotels,
  reviewsCount,
}: UserDetailType) => {
  const { currentUser } = useAuthStateContext();
  console.log("ユーザー詳細ページが呼ばれたよ");
  return (
    <>
      <Layout title={`${name}さんの詳細ページ`}>
        <UpdateUserProfile name={name} image={image} uid={uid} />
        <div className="tabs flex mt-5">
          <Link href={`/users/${id}`} className="tab tab-bordered pl-3">
            口コミ<> {reviewsCount}件</>
          </Link>
          {hotelsCount === 0 ? (
            <></>
          ) : (
            <>
              <Link
                href={`/users/${id}/hotels`}
                className="tab tab-bordered tab-active pl-3"
              >
                掲載ホテル<> {hotelsCount}件</>
              </Link>
            </>
          )}
          {currentUser && currentUser.uid === uid ? (
            <>
              <Link
                href={`/users/${id}/favorites`}
                className="tab tab-bordered pl-3"
              >
                お気に入り一覧
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        {hotels ? (
          <HotelOfUserProfile props={hotels} />
        ) : (
          <div className="mt-3 ml-3">掲載ホテルはありません。</div>
        )}
      </Layout>
    </>
  );
};
export default UserHotels;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const { id } = ctx.query;
  const apiResponse = await client.get(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      uid: ctx.req.cookies["_uid"],
      client: ctx.req.cookies["_client"],
      "access-token": ctx.req.cookies["_access_token"],
    },
  });

  const UserDetail: UserDetailType = apiResponse.data;

  if (!UserDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...UserDetail,
    },
  };
};
