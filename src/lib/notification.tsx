import React from "react";
import Cookies from "js-cookie";
import client from "./client";

export const readNotification = () => {
  return client.get(`/notifications`, {
    headers: {
      access_token: Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const getNotificationCount = () => {
  return client.get(`/notification_or_not`, {
    headers: {
      access_token: Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
