import Cookies from "js-cookie";
import client from "./client";

export const getNotification = (
  accessToken: string | string[] | undefined,
  clientToken: string | string[] | undefined,
  uid: string | string[] | undefined
) => {
  return client.get(`/notifications`, {
    headers: {
      "access-token": accessToken,
      client: clientToken,
      uid,
    },
  });
};

export const getNotificationCount = () => {
  return client.get(`/notification_or_not`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
