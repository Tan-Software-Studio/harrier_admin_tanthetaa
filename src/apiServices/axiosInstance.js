import axios from "axios";
import BACKEND_BASE_URL from "./baseUrl";

const BACKEND_URL = BACKEND_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "content-type": "multipart/form-data",
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(error);
  }
);
export default axiosInstance;
