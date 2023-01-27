import Cookies from "js-cookie";
import { HotelCreateType, HotelFacilityType } from "types/types";
import client from "./client";

export const getAllHotel = () => {
  return client.get("/hotels");
};

export const getHotelDetail = (id: string | string[] | undefined) => {
  return client.get(`/hotels/${id}`);
};

export const createHotel = (params: HotelCreateType) => {
  return client.post(
    "/hotels",
    { hotel: params },
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
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

export const postImageKeyOfHotel = (
  id: string | string[] | undefined,
  // params: string[]
  params: string[]
) => {
  return client.post(
    `/hotels/${id}/images`,
    { key: params },
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
};

export const getDays = (id: string | string[] | undefined) => {
  return client.get(`/hotels/${id}/days`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateFacilities = (
  id: string | string[] | undefined,
  params: HotelFacilityType
) => {
  return client.patch(
    `/hotels/${id}/hotel_facilities`,
    { hotel_facilities: params },
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );
};
