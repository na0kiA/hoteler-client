import Cookies from "js-cookie";
import {
  PostResetPasswordParams,
  SignInParams,
  SignUpParams,
  UpdatePasswordParams,
  UpdateUserShowParams,
} from "types/types";
import client from "./client";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";

export const signUp = (params: SignUpParams) => {
  return client.post("/auth", params);
};

export const signIn = (params: SignInParams) => {
  return client.post("/auth/sign_in", params);
};

export const signOut = () => {
  return client.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// パスワード再設定のための申請
export const postResetPassword = (params: PostResetPasswordParams) => {
  return client.post("/auth/password", params);
};

// パスワード更新
export const updatePassword = (
  params: UpdatePasswordParams,
  query: ParsedUrlQuery
) => {
  return client.put("/auth/password", params, {
    headers: {
      // "access-token": Cookies.get("_access_token"),
      // client: Cookies.get("_access_token"),
      // uid: Cookies.get("_access_token"),
      "access-token": query["access-token"],
      client: query.client,
      uid: query.uid,
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

export const updateUserShow = (params: UpdateUserShowParams) => {
  return client.patch("/auth", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

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
  return client.get(`/users/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ユーザーのお気に入りホテル一覧取得
export const getUserFavorites = (id: string | string[] | undefined) => {
  return client.get(`/users/${id}/favorites`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// export const updateUserShow = (params: UpdateUserShowParams) => {
// return client.patch("/auth", params, {
//   headers: {
//     "access-token": Cookies.get("_access_token"),
//     client: Cookies.get("_client"),
//     uid: Cookies.get("_uid"),
//   },
// });
// };

export const withAuthServerSideProps = (
  url: string,
  onlyAuthenticated: boolean
): GetServerSideProps => {
  return async (context) => {
    const { req } = context;
    const response = await client.get(`${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies._uid || null,
        client: req.cookies._client || null,
        "access-token": req.cookies._access_token || null,
      },
    });

    if (onlyAuthenticated && !response.data.is_login) {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }

    const auth = await response.data;

    return {
      props: {
        ...auth,
      },
    };
  };
};
export const withRequireNotAuthServerSideProps = (): GetServerSideProps => {
  return async (context) => {
    const { req } = context;
    const response = await client.get(`/auth/sessions`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies._uid || null,
        client: req.cookies._client || null,
        "access-token": req.cookies._access_token || null,
      },
    });

    if (response.data.is_login) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const props = await response.data;

    return {
      props,
    };
  };
};
