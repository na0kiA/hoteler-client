import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const accsessToken: any = Cookies.get("_access_token");
const cli: any = Cookies.get("_client");
const uid: any = Cookies.get("_uid");

const postClient: AxiosInstance | any = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: {
    "Content-Type": "application/json",
    "access-token": accsessToken,
    client: cli,
    uid: uid,
  },
});

// axios.defaults.xsrfCookieName = "CSRF-TOKEN";
// axios.defaults.xsrfHeaderName = "X-CSRF-Token";
// axios.defaults.withCredentials = true;

// const getCsrfToken = async () => {
//   try {
//     const response = await postClient.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/v1/reviews/47`
//     );
//     const csrfToken = response.headers["x-csrf-token"];
//     postClient.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
//   } catch (error) {
//     console.error(error);
//   }
// };

// getCsrfToken();

export default postClient;
