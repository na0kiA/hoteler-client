import Cookies from "js-cookie";
import { HotelRateParams, ServiceRateType } from "types/types";
import client from "./client";
import { getDays } from "./hotels";

export const getRestRates = (
  id: number,
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  return client.get(`/days/${id}/rest_rates`, {
    headers: {
      "access-token": Cookies.get("_access_token") || accessToken,
      client: Cookies.get("_client") || clientToken,
      uid: Cookies.get("_uid") || uid,
    },
  });
};

export const getStayRates = (
  id: number,
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  return client.get(`/days/${id}/stay_rates`, {
    headers: {
      "access-token": Cookies.get("_access_token") || accessToken,
      client: Cookies.get("_client") || clientToken,
      uid: Cookies.get("_uid") || uid,
    },
  });
};

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

export const getServiceList = async (
  id: string | string[] | undefined,
  accessToken: string,
  clientToken: string,
  uid: string
) => {
  try {
    const hotelDays = await client.get(`/hotels/${id}/days`, {
      headers: {
        "Content-Type": "application/json",
        uid: uid,
        client: clientToken,
        "access-token": accessToken,
      },
    });

    const weekDayIdList = [
      hotelDays.data[0]?.id,
      hotelDays.data[1]?.id,
      hotelDays.data[2]?.id,
      hotelDays.data[3]?.id,
      hotelDays.data[4]?.id,
      hotelDays.data[5]?.id,
      hotelDays.data[6]?.id,
    ];

    const getEachServiceList = weekDayIdList.flatMap(async (id) => {
      const serviceList = [
        await getRestRates(id, accessToken, clientToken, uid),
        await getStayRates(id, accessToken, clientToken, uid),
      ];
      return serviceList;
    });

    const [results] = await Promise.all([getEachServiceList]);
    const serviceList = [
      await results[0],
      await results[1],
      await results[2],
      await results[3],
      await results[4],
      await results[5],
      await results[6],
    ];

    const filterdServiceList = serviceList
      .flat()
      .filter((item: any) => item.status === 200)
      .map((item: any) => {
        return item.data;
      });
    const result: ServiceRateType[][] = filterdServiceList.flat();
    return result;
  } catch (error) {
    console.log(error);
  }
};
