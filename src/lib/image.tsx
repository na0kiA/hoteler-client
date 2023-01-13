import Cookies from "js-cookie";
import client from "./client";

export const fetchSignedUrl = () => {
  return client.get("/images", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
