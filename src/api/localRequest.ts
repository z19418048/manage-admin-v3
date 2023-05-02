import type { AxiosInstance } from "axios";
import axios from "axios";
import instance from "@/api/request";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const localInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

localInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

localInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
export default localInstance;
