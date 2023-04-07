import axios, { AxiosInstance } from "axios";

const client: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});

client.defaults.withCredentials = true;

export default client;
