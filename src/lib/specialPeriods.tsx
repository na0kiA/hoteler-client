import Cookies from "js-cookie";
import { SpecialPeriodType } from "types/types";
import client from "./client";

export const getSpecialPeriod = (id: number) => {
  return client.get(`/days/${id}/special_periods`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const createSpecialPeriod = (params: SpecialPeriodType, id: number) => {
  return client.post(`/days/${id}/special_periods`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const deleteSpecialPeriod = (dayId: number, id: number) => {
  return client.delete(`/days/${dayId}/special_periods/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
export const updateSpecialPeriod = (
  params: SpecialPeriodType,
  dayId: number,
  id: number
) => {
  return client.patch(`/days/${dayId}/special_periods/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
