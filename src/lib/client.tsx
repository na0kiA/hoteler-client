import axios, { AxiosInstance } from "axios";

const client: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
});

// CSRF対策をすること
// axios.defaults.xsrfCookieName = "CSRF-TOKEN";
// axios.defaults.xsrfHeaderName = "X-CSRF-Token";

client.defaults.withCredentials = true;

export default client;
