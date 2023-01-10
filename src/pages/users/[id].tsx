import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import {
  deleteAccount,
  getUserShow,
  updateUserShow,
  withAuthServerSideProps,
} from "lib/auth";
import { ReviewType, updateUserShowParams, UserDetailType } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import Layout from "components/Layout";
import OnUploadImage from "components/s3ByForm";
import Link from "next/link";
import ReviewsHotelCard from "components/ReviewsHotelCard";

const UserDetail = ({
  id,
  name,
  image,
  uid,
  hotelsCount,
  favorites,
  reviews,
  myAccount,
}: UserDetailType) => {
  const router = useRouter();
  const forSliceImageKeyNumber = 54;
  const { currentUser, isSignedIn, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();
  console.log("ユーザー詳細ページが呼ばれたよ");
  console.log(currentUser);

  const [userName, setUserName] = useState<string>("あいうえお");
  const [userEmail, setUserEmail] = useState<string>(uid);
  const [s3ImageKey, setS3ImageKey] = useState(
    image.slice(forSliceImageKeyNumber)
  );
  const [error, setError] = useState("");

  const generateParams = () => {
    const editProfileParams: updateUserShowParams = {
      name: userName,
      email: userEmail,
      image: s3ImageKey,
    };
    return editProfileParams;
  };

  const handleDeleteAccount = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      const res = await deleteAccount();
      if (res.status == 200) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        setCurrentUser(undefined);
        router.push("/");
        console.log("アカウント削除に成功");
      } else {
        throw new Error(
          "アカウント削除に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateUserProfile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const params = generateParams();
    const res = await updateUserShow(params);
    try {
      if (res.status == 200) {
        console.log("アカウント編集に成功");
      } else {
        throw new Error(
          "アカウント編集に失敗しました。画面をご確認の上もう一度実行してください。"
        );
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        setError(error.response.data.errors);
      } else {
        console.log(error);
      }
    }
  };

  const handleEditUserProfile = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    return (
      <>
        <input
          type="text"
          className="input input-bordered"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <OnUploadImage />
      </>
    );
  };

  return (
    <>
      <Layout title={`${name}さんの詳細ページ`}>
        <div className="card w-full bg-base-100 shadow-xl pt-5">
          <figure className="">
            <Image
              src={image}
              alt="ユーザー画像"
              width={50}
              height={50}
              priority={true}
              className="rounded-full m-auto"
            />
          </figure>
          <div className="card-body items-center text-center pt-1">
            <h2 className="card-title">
              <div className="p-2">{userName}</div>
            </h2>
            <div className="card-actions">
              {currentUser && currentUser.uid === uid ? (
                <>
                  <button
                    className="btn btn-primary btn-xs"
                    onClick={(event) => {
                      handleUpdateUserProfile(event);
                    }}
                  >
                    プロフィールを編集する
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="tabs flex  mt-5">
          <a className="tab tab-bordered tab-active pl-3">
            口コミ {reviews.length}件
          </a>
          <Link href="/users/${id}/hotels" className="tab tab-bordered pl-3">
            掲載ホテル<> {hotelsCount}件</>
          </Link>
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
          reviews
        ) : (
          <>
            {reviews.map((review: ReviewType) => (
              <ReviewsHotelCard props={review} />
            ))}
          </>
        )}
      </Layout>
    </>
  );
};
export default UserDetail;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=180"
  );

  const { id } = ctx.query;
  const apiResponse = await getUserShow(id);

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
