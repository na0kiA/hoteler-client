import React from "react";
import Link from "next/link";

import client from "lib/client";
import { UserDetailType } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import Layout from "components/Layout";
import ReviewsOfUserProfile from "components/ReviewsOfUserProfile";
import UpdateUserProfile from "components/UpdateUserProfile";

const UserDetail = ({
  id,
  name,
  image,
  uid,
  hotelsCount,
  reviews,
  reviewsCount,
}: UserDetailType) => {
  const { currentUser } = useAuthStateContext();
  return (
    <>
      <Layout title={`${name}さんの詳細ページ`}>
        <UpdateUserProfile name={name} image={image} uid={uid} />
        <div className="tabs flex mt-5">
          <a className="tab tab-bordered tab-active pl-3">
            口コミ {reviewsCount}件
          </a>
          {hotelsCount === 0 ? (
            <></>
          ) : (
            <>
              <Link
                href={`/users/${id}/hotels`}
                className="tab tab-bordered pl-3"
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
        {typeof reviews === "string" ? (
          <div className="mt-3 ml-3">{reviews}</div>
        ) : (
          <ReviewsOfUserProfile props={reviews} />
        )}
      </Layout>
    </>
  );
};
export default UserDetail;

export const getServerSideProps = async (ctx: any) => {
  const { id } = ctx.query;

  try {
    const response = await client.get(`/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        uid: ctx.req.cookies._uid || "",
        client: ctx.req.cookies._client || "",
        "access-token": ctx.req.cookies._access_token || "",
      },
    });
    const UserDetail: UserDetailType = response?.data?.user;
    return {
      props: {
        ...UserDetail,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
