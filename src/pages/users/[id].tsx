import React, { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getCurrentUser, getUserShow } from "lib/auth";
import { UserDetailType } from "types/types";
import { useRouter } from "next/router";
import { AuthContext } from "pages";

const UserDetail = ({ name, image, favorites, reviews }: UserDetailType) => {
  const router = useRouter();
  const { setIsSignedIn, setCurrentUser, setLoading, currentUser } =
    useContext(AuthContext);

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);
      if (res?.data.is_login === true) {
        setIsSignedIn == true;
        setCurrentUser == res?.data.data;
      } else {
        setIsSignedIn == false;
      }
    } catch (e) {
      console.log(e);
    }
    setLoading == false;
  };

  useEffect(() => {
    handleGetCurrentUser();
    console.log(currentUser);
  }, [setCurrentUser]);

  return (
    <>
      <h1>{name}</h1>
      <h1>{image}</h1>
      <h1>{reviews.title}</h1>
      <h1>{reviews.content}</h1>
      <h1>{reviews.userName}</h1>
      <h1>{reviews.userImage}</h1>
      <h1>{favorites.hotelName}</h1>
      <h1>{favorites.hotelTopImage}</h1>
      <h1>{favorites.fiveStarRate}</h1>
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
