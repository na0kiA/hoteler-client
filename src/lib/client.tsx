import { AxiosInstance } from "axios";
import axios from "axios";

const client: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});

axios.defaults.xsrfHeaderName = "x-csrf-Token";
client.defaults.withCredentials = true;

export default client;
