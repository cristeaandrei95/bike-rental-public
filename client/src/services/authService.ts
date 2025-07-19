import axios from "axios";
import apiService, { setAuthTokenOnAxios } from "./api/apiService";
import { toastSuccess, toastError } from "./toastsService";
import { LoginCredentials, NewRegisteredUser, ResetCredentials } from "@types";
import { TOKEN } from "@constants";

const authService = {
  login: async (credentials: LoginCredentials) => {
    return apiService
      .post("/login", credentials)
      .then(({ data: { token } }: { data: { token: string } }) => {
        localStorage.setItem(TOKEN, token);
        setAuthTokenOnAxios(token);

        return token;
      });
  },
  register: async (newRegisteredUser: NewRegisteredUser) => {
    return apiService.post("/register", newRegisteredUser);
  },
  logout: () => {
    localStorage.removeItem(TOKEN);
    setAuthTokenOnAxios(null);
  },
  forgotPassword: async (email: string) => {
    try {
      await apiService.post("/forgot-password", { email });
      toastSuccess(
        "You have successfully reset your password. Please check your email."
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }
    }
  },
  resetPassword: async (resetCredentials: ResetCredentials) => {
    return apiService.post("/reset-password", resetCredentials);
  },
};

export default authService;
