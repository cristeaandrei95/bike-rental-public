import { AxiosError } from "axios";
import authService from "@services/authService";

const ignoreRoutes = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
];

export default function errorInterceptor(error: AxiosError) {
  if (
    error.response?.status === 401 &&
    !ignoreRoutes.includes(window.location.pathname)
  ) {
    authService.logout();
    window.location.href = "/login";
  }
  return Promise.reject(error);
}
