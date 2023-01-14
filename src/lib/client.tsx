import axios, { AxiosInstance } from "axios";

const client: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios.defaults.xsrfCookieName = "CSRF-TOKEN";
// axios.defaults.xsrfHeaderName = "X-CSRF-Token";
// axios.defaults.withCredentials = true;

export default client;
