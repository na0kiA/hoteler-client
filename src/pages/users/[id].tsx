import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { deleteAccount, getUserShow, updateUserShow } from "lib/auth";
import { ReviewType, updateUserShowParams, UserDetailType } from "types/types";
import { useAuthStateContext } from "context/AuthProvider";
import Layout from "components/Layout";
import Link from "next/link";
import ReviewsOfUserProfile from "components/ReviewsOfUserProfile";
import { fetchSignedUrl } from "lib/image";

const UserDetail = ({
  id,
  name,
  image,
  uid,
  hotelsCount,
  favorites,
  reviews,
  reviewsCount,
  myAccount,
}: UserDetailType) => {
  const router = useRouter();
  const forSliceImageKeyNumber = 54;
  const { currentUser, isSignedIn, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();
  console.log("ユーザー詳細ページが呼ばれたよ");

  const [error, setError] = useState("");
  const [userName, setUserName] = useState<string>(name);
  const [userEmail, setUserEmail] = useState<string>(uid);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [userImage, setUserImage] = useState(
    image.slice(forSliceImageKeyNumber)
  );
  const [imageUrl, setImageUrl] = useState("");

  const generateParams = () => {
    const editProfileParams: updateUserShowParams = {
      name: userName,
      email: userEmail,
      image: userImage,
    };
    return editProfileParams;
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
        router.reload();
        setImageUrl("");
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

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const res = await fetchSignedUrl();
    const S3DirectPost = await res.data;
    if (!event.target.files) return;
    const file: File = event.target.files[0];

    const fields = S3DirectPost.fields;
    const formData = new FormData();
    for (const key in fields) {
      formData.append(key, fields[key]);
    }
    formData.append("file", file);

    const ret = await fetch(S3DirectPost.url, {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
      },
      body: formData,
    });
    const resText = await ret.text();
    const parseXML = (text: string) =>
      new DOMParser().parseFromString(text, "application/xml");
    const resXML = await parseXML(resText);
    const locationOfImage =
      resXML.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
    if (!locationOfImage) return;
    const key = await resXML.getElementsByTagName("Key")[0].childNodes[0]
      .nodeValue;
    if (!key) return;

    setImageUrl(locationOfImage);
    setUserImage(key);
  };

  return (
    <>
      <Layout title={`${name}さんの詳細ページ`}>
        <div className="card w-full bg-base-100 shadow-xl pt-5">
          {editToggle ? (
            <>
              <Image
                src={image}
                alt="ユーザー画像"
                width={50}
                height={50}
                priority={true}
                className="rounded-full m-auto"
              />
              <input
                type="file"
                className="file-input file-input-bordered file-input-xs w-5/6 max-w-xs m-auto mt-5"
                onChange={handleChangeImage}
              />
              {imageUrl && (
                <>
                  <Image
                    src={imageUrl}
                    alt="ユーザー画像"
                    width={50}
                    height={50}
                    className="rounded-full m-auto mt-3"
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Image
                src={image}
                alt="ユーザー画像"
                width={50}
                height={50}
                priority={true}
                className="rounded-full m-auto"
              />
            </>
          )}
          <div className="card-body items-center text-center pt-1">
            <h2 className="card-title">
              {editToggle ? (
                <>
                  <div className="form-control">
                    <label className="label p-1">
                      <span className="label-text text-sm">名前</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-full max-w-xs text-xs"
                      value={userName}
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2">{userName}</div>
                </>
              )}
            </h2>
            <div className="card-actions">
              {currentUser && currentUser.uid === uid ? (
                <>
                  <div>
                    <button
                      className="btn btn-primary btn-xs md:btn-sm   flex-none mr-2"
                      onClick={() => {
                        setEditToggle(!editToggle);
                      }}
                    >
                      {editToggle ? "キャンセル" : "プロフィールを編集する"}
                    </button>
                  </div>
                  {editToggle ? (
                    <>
                      <button
                        className="btn btn-primary btn-xs md:btn-sm  flex-none"
                        onClick={(event) => {
                          handleUpdateUserProfile(event);
                          setEditToggle(!editToggle);
                        }}
                      >
                        保存
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="tabs flex  mt-5">
          <a className="tab tab-bordered tab-active pl-3">
            口コミ {reviewsCount}件
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
          <div className="mt-3 ml-3">{reviews}</div>
        ) : (
          <>
            {reviews.map((review: ReviewType) => (
              <div key={review.id}>
                <ReviewsOfUserProfile props={review} uid={uid} />
              </div>
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
  console.log(UserDetail);

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
