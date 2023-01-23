import Cookies from "js-cookie";
import { HotelCreateType } from "types/types";
import client from "./client";

export const getAllHotel = () => {
  return client.get("/hotels");
};

export const getHotelDetail = (id: string | string[] | undefined) => {
  return client.get(`/hotels/${id}`);
};

export const createHotel = (params: HotelCreateType) => {
  return client.post("/hotels", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateHotel = (id: number, params: string) => {
  return client.patch(`/hotel/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const deleteHotel = (id: number) => {
  return client.delete(`/hotel/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const postImageKeyOfHotel = (params: string[], id: number) => {
  return client.post(`/hotels/${id}/images`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getDays = (id: number) => {
  return client.get(`/hotels/${id}/days`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
