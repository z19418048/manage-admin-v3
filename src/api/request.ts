import axios, { AxiosError } from "axios";

import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import type { ErrorResponse } from "@/api/types";
import { MessagePlugin } from "tdesign-vue-next";
import { useAppStore } from "@/store";

//接口前缀做代理
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  //设置请求相应时间
  timeout: 60000,
});
const tokenPrefix = "Bearer ";

instance.interceptors.request.use((request: AxiosRequestConfig) => {
  const appStore = useAppStore();
  if (appStore.token && request.headers) {
    // @ts-ignore
    request.headers["Authorization"] = tokenPrefix + appStore.token;
  }
  return request;
});
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const responseData: ErrorResponse | undefined = error.response?.data;
    responseData && (await MessagePlugin.error(responseData.message));

    if (error.response?.status === 401 || error.response?.status === 403) {
      const appStore = useAppStore();
      await appStore.logout();
    }
    return Promise.reject(error);
  }
);
//抛出instance
export default instance;
