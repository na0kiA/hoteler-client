import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import { SignInParams, SignUpParams, updateUserShowParams } from "types/types";
import client from "./client";

// ホテルの口コミ一覧を取得
export const getReviewIndex = (hotelId: string | string[] | undefined) => {
  return client.get(`/hotels/${hotelId}/reviews`);
};

// 口コミ詳細を取得
export const getReviewShow = (id: string | string[] | undefined) => {
  return client.get(`/reviews/${id}`);
};

// 口コミを削除
export const deleteReview = (id: number) => {
  return client.delete(`/reviews/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 口コミを新規作成
export const createReview = (hotelId: number, params: string | number) => {
  return client.post(`/hotels/${hotelId}/reviews`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 口コミを更新
export const updateReview = (id: number, params: string | number) => {
  return client.patch(`/reviews/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
