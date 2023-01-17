import axios from "axios";
import cryptoJS from "crypto-js";
import BACKEND_BASE_URL from "./baseUrl";

const cryptoKey = process.env.REACT_APP_CRYPTOGRAPHY_SECRET_KEY;

// Encrypt & Decrypt
const BACKEND_URL = BACKEND_BASE_URL;

const axiosInstanceAuth = axios.create({
  baseURL: BACKEND_URL,
});

// eslint-disable-next-line consistent-return
const decryptData = (encryptedData) => {
  try {
    const plain = cryptoJS.AES.decrypt(encryptedData.toString(), cryptoKey);
    return JSON.parse(plain.toString(cryptoJS.enc.Utf8));
  } catch (err) {
    console.log(err);
  }
};

axiosInstanceAuth.interceptors.request.use(
  (config) => {
    const Auth = localStorage.getItem("token");
    if (Auth) {
      config.headers = {
        Authorization: `Bearer ${Auth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "content-type": "multipart/form-data",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstanceAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    Promise.reject(error);

  }
);
export default axiosInstanceAuth;
