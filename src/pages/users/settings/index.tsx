import { useAuthStateContext } from "context/AuthProvider";
import { getCurrentUser, withAuthServerSideProps } from "lib/auth";
import Link from "next/link";
import { GetServerSideProps } from "next";
import React, { useLayoutEffect } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import client from "lib/client";

const Home = () => {
  const { currentUser } = useAuthStateContext();
  console.log(currentUser);

  const router = useRouter();

  useLayoutEffect(() => {
    !currentUser && router.push("/signin");
  }, []);

  return (
    <Layout title={"設定"}>
      <Link className="link text-xs" href={"/users/settings/delete-account"}>
        アカウントを削除する
      </Link>
    </Layout>
  );
};

export default Home;
