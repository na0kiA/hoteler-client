import Cookies from "js-cookie";
import { PostReviewParams, ReviewEditParams } from "types/types";
import client from "./client";

// ホテルの口コミ一覧を取得
export const getHotelReviews = (id: string | string[] | undefined) => {
  return client.get(`/hotels/${id}/reviews`);
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
export const createReview = (hotelId: number, params: PostReviewParams) => {
  return client.post(`/hotels/${hotelId}/reviews`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 口コミを更新
export const updateReview = (id: number, params: ReviewEditParams) => {
  return client.patch(`/reviews/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// 参考になったを登録
export const createHelpfulness = (id: number) => {
  return client.post(
    `/reviews/${id}/helpfulnesses`,
    {},
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
};

// 参考になったがあるかどうか
export const searchHelpfulness = (
  id: string | string[] | undefined,
  accessToken: string | undefined,
  clientToken: string | undefined,
  uid: string | undefined
) => {
  return client.get(`/reviews/${id}/helpfulnesses`, {
    headers: {
      "access-token": accessToken,
      client: clientToken,
      uid,
    },
  });
};

// 参考になったを解除
export const deleteHelpfulness = (reviewId: number) => {
  return client.delete(`/reviews/${reviewId}/helpfulnesses`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
