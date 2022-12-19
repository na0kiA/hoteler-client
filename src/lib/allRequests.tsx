import Cookies from 'js-cookie';
import client from './client';

// ホテル一覧
export const getAllHotel = () => {
  return client.get('/hotels');
};

// ホテル詳細
export const getHotelDetail = (id: string | string[] | undefined) => {
  return client.get(`/hotels/${id}`);
};

// ホテルを新規作成
export const createHotel = (params: string) => {
  return client.post('/hotels', params, {
    headers:{
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    },
  });
};

// ホテルを更新
// export const updateHotel = (id: number, params: string) => {
//   return client.patch(`/hotel/${id}`, params, {
//     headers: {
//       "access-token": Cookies.get("_access_token"),
//       "client": Cookies.get("_client"),
//       "uid": Cookies.get("_uid")
//     },
//   });
// };

// ホテルを削除
// export const deleteHotel = (id: number) => {
//   return client.delete(`/hotel/${id}`, {
//     headers: {
//       "access-token": Cookies.get("_access_token"),
//       "client": Cookies.get("_client"),
//       "uid": Cookies.get("_uid")
//     },
//   });
// };

// S3のKeyをDBに送信
// export const postImageKeyOfHotel = (params: string) => {
//   return client.post('/hotels', params, {
//     headers: {
//       "access-token": Cookies.get("_access_token"),
//       "client": Cookies.get("_client"),
//       "uid": Cookies.get("_uid")
//     },
//   });
// };

// export const fetchSignedUrl = (params: string) => {
//   return client.get('/hotels', {
//     headers: {
//       "access-token": Cookies.get("_access_token"),
//       "client": Cookies.get("_client"),
//       "uid": Cookies.get("_uid")
//     },
//   });
// };