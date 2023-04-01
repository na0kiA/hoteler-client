import axios, { AxiosInstance } from "axios";

const client: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NGROK_PUBLIC_API_URL}/v1`,
});

// client.defaults.xsrfCookieName = "CSRF-TOKEN";
// client.defaults.xsrfHeaderName = "X-CSRF-Token";
client.defaults.withCredentials = true;

export default client;
