import Cookies from "js-cookie";
import {
  HotelCreateType,
  HotelFacilityType,
  HotelUpdateType,
} from "types/types";
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

export const updateHotel = (id: number, params: HotelUpdateType) => {
  return client.patch(`/hotels/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const deleteHotel = (id: number) => {
  return client.delete(`/hotels/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const postImageKeyOfHotel = (
  id: string | string[] | undefined,
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

export const getDays = (id: string | string[] | undefined | number) => {
  return client.get(`/hotels/${id}/days`);
};

export const getHotelImages = (id: string | string[] | undefined) => {
  return client.get(`/hotels/${id}/images`);
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

export const postFavorite = (id: number) => {
  return client.post(
    `/hotels/${id}/favorites`,
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

export const deleteFavorite = (id: number) => {
  return client.delete(`/hotels/${id}/favorites`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
