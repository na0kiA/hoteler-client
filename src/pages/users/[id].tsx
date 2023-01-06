import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { deleteAccount, getCurrentUser, getUserShow } from "lib/auth";
import { CurrentUser, UserDetailType } from "types/types";
import Image from "next/image";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

  return (
    <>
      {currentUser && id === currentUser.id ? (
        <>
          <div>
            {/* <button
              className="btn btn-primary btn-xs"
              onClick={(event) => {
                handleEditAccount(event);
              }}
            >
              編集する
            </button> */}
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
  const { id } = ctx.query;
  const res = await getUserShow(id);
  const UserDetail: UserDetailType = res.data;
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
