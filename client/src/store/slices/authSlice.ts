import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Role,
  User,
  NewRegisteredUser,
  LoginCredentials,
  ResetCredentials,
} from "@types";
import { toastError, toastSuccess } from "@services/toastsService";
import authService from "@services/authService";
import { TOKEN } from "@constants";

interface AuthState {
  isSubmitting: boolean;
  isAuthenticated: boolean;
  user: User;
  token: string | null;
}

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const token = await authService.login(credentials);
      const user = jwt_decode<User>(token);

      return { token, user };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      return thunkAPI.rejectWithValue(true);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      userData,
      navigate,
    }: { userData: NewRegisteredUser; navigate: (to: string) => void },
    thunkAPI
  ) => {
    try {
      await authService.register(userData);
      toastSuccess(
        "You have successfully registered an account! You can login into your account now."
      );
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      thunkAPI.rejectWithValue(true);

      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    {
      resetCredentials,
      navigate,
    }: { resetCredentials: ResetCredentials; navigate: (to: string) => void },
    thunkAPI
  ) => {
    try {
      await authService.resetPassword(resetCredentials);
      toastSuccess(
        "You have successfully changed your password! You can login into your account now."
      );
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      thunkAPI.rejectWithValue(true);

      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () =>
  authService.logout()
);

const token = localStorage.getItem(TOKEN);
const user = token ? jwt_decode<User>(token) : null;

const initialState: AuthState = {
  isSubmitting: false,
  isAuthenticated: Boolean(token),
  user: {
    id: null,
    name: null,
    role: Role.ANONYMOUS,
    ...user,
  },
  token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user as User;
      state.token = action.payload.token;
      state.isSubmitting = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(register.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: null,
        name: null,
        role: Role.ANONYMOUS,
      };
      state.token = null;
    });
  },
});

export default authSlice.reducer;
