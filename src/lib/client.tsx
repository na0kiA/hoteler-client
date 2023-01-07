import axios, { AxiosInstance } from "axios";
// import fetchAdapter from "@vespaiach/axios-fetch-adapter";

const client: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: { "Content-Type": "application/json" },
  // adapter: fetchAdapter,
});

export default client;
