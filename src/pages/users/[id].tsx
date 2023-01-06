import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  deleteAccount,
  getCurrentUser,
  getUserShow,
  updateUserShow,
} from "lib/auth";
import { CurrentUser, updateUserShowParams, UserDetailType } from "types/types";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const UserDetail = ({
  id,
  name,
  image,
  favorites,
  reviews,
}: UserDetailType) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser>();
  const [userName, setUserName] = useState<string>("");
  const [awsS3Image, setAwsS3Image] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  const generateParams = () => {
    const editProfileParams: updateUserShowParams = {
      name: userName,
      email: userEmail,
      image: awsS3Image,
    };
    return editProfileParams;
  };

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        setIsSignedIn(false);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

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
      {currentUser && id === currentUser.id ? (
        <>
          <div>
            <label htmlFor="name">名前</label>
            <input
              type="name"
              id="name"
              name="name"
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
      {console.log(reviews)}

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
