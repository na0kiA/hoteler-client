import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const acc: any = Cookies.get("_access_token");
const cli: any = Cookies.get("_client");
const uid: any = Cookies.get("_uid");

const postClient: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
    "access-token": acc,
    client: cli,
    uid: uid,
  },
});
export default postClient;
