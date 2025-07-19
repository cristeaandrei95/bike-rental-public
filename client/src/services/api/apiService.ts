import axios from "axios";
import errorInterceptor from "./interceptors/error.interceptor";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthTokenOnAxios(token: string | null) {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
}

axiosInstance.interceptors.response.use((res) => res, errorInterceptor);

export default axiosInstance;
