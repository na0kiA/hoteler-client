import Cookies from "js-cookie";
import { SpecialPeriodType } from "types/types";
import client from "./client";
import { getDays } from "./hotels";

export const getSpecialPeriod = async (
  id: string | string[] | undefined,
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  const hotelDays = await getDays(id);
  const specialPeriodId = await hotelDays.data.days?.[6]?.id;
  const specialPeriod = await client.get(
    `/days/${specialPeriodId}/special_periods`,
    {
      headers: {
        "Content-Type": "application/json",
        uid,
        client: clientToken,
        "access-token": accessToken,
      },
    }
  );
  console.log(specialPeriod);

  return specialPeriod;
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
