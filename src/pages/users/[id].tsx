import React, { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { deleteAccount, getUserShow, updateUserShow } from "lib/auth";
import { updateUserShowParams, UserDetailType } from "types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "components/Navbar";
import { useAuthStateContext } from "context/AuthProvider";
import Layout from "components/Layout";

const UserDetail = ({
  id,
  name,
  image,
  uid,
  favorites,
  reviews,
  myAccount,
}: UserDetailType) => {
  const router = useRouter();
  const { currentUser, isSignedIn, loading, setIsSignedIn, setCurrentUser } =
    useAuthStateContext();
  console.log("ユーザー詳細ページが呼ばれたよ");

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>(uid);
  const [s3ImageKey, setAwsS3ImageKey] = useState(image);
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

  const handleEditUserProfile = async (
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

  return (
    <>
      <Layout title={`${name}さんの詳細ページ`}>
        {console.log(currentUser)}
        {currentUser ? (
          <>
            <div>
              <input
                type="text"
                className="input input-bordered"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                className="btn btn-primary btn-xs"
                onClick={(event) => {
                  handleEditUserProfile(event);
                }}
              >
                編集する
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
        <h1>{name}</h1>
        <h1>
          <Image
            src={image}
            alt="ユーザー画像"
            width={50}
            height={50}
            priority={true}
          />
        </h1>
        <h1>{reviews.title}</h1>
        <h1>{reviews.content}</h1>
        <h1>{reviews.userName}</h1>
        <h1>{reviews.userImage}</h1>
        {currentUser && id === currentUser.id ? (
          <div>
            <button
              className="btn btn-primary btn-xs"
              onClick={(event) => {
                handleDeleteAccount(event);
              }}
            >
              アカウントを削除
            </button>
          </div>
        ) : (
          <></>
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

  if (ctx.req.cookies._uid === apiResponse.data.uid) {
    UserDetail.myAccount = true;
  } else {
    UserDetail.myAccount = false;
  }

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