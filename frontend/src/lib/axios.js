import axios from "axios";

const BASEURL =
  import.meta.env.MODE === "development"
    ? "https://streamify-video-calling-six.vercel.app/api"
    : "/api";
export const axiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});
