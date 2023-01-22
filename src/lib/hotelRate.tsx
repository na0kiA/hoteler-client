import Cookies from "js-cookie";
import { HotelRateParams } from "types/types";
import client from "./client";

export const createRestRate = (params: HotelRateParams, id: number) => {
  return client.post(`/days/${id}/rest_rates`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const createStayRate = (params: HotelRateParams, id: number) => {
  return client.post(`/days/${id}/stay_rates`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateRestRate = (
  params: HotelRateParams,
  dayId: number,
  id: number
) => {
  return client.patch(`/days/${dayId}/rest_rates/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const updateStayRate = (
  params: HotelRateParams,
  dayId: number,
  id: number
) => {
  return client.patch(`/days/${dayId}/stay_rates/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const deleteRestRate = (id: number, dayId: number) => {
  return client.delete(`/days/${dayId}/rest_rates/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const deleteStayRate = (id: number, dayId: number) => {
  return client.delete(`/days/${dayId}/stay_rates/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
