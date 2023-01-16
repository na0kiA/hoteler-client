import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import {
  PostResetPasswordParams,
  SignInParams,
  SignUpParams,
  UpdatePasswordParams,
  updateUserShowParams,
} from "types/types";
import client from "./client";
import { ParsedUrlQuery } from "querystring";

// サインアップ
export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

// パスワード変更の申請
export const postResetPassword = (params: PostResetPasswordParams) => {
  return client.post("/auth/password", params);
};

// パスワード変更
export const updatePassword = (
  params: UpdatePasswordParams,
  query: ParsedUrlQuery
) => {
  return client.put("/auth/password", params, {
    headers: {
      "access-token": query["access-token"],
      client: query["client"],
      uid: query["uid"],
    },
  });
};

export const signIn = (params: SignInParams) => {
  return client.post("/auth/sign_in", params);
};

// サインアウト
export const signOut = () => {
  return client.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const deleteAccount = () => {
  return client.delete("/auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateUserShow = (params: updateUserShowParams) => {
  return client.patch("/auth", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ログインユーザーの取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;

  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ユーザー詳細を取得
export const getUserShow = (id: string | string[] | undefined) => {
  return client.get(`/users/${id}`);
};

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const { req, res } = context;

    const response = client.get(`/${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
    });

    if (response.status === 401) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    } else if (response.status === 422) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // TODO: 他にも500エラーを考慮した分岐も必要
    const currentUserResponse = await response.data;
    console.log(currentUserResponse);

    return { props: { ...currentUserResponse } };
  };
};
