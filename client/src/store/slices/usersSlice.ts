import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import usersService from "@services/usersService";
import { toastSuccess, toastError } from "@services/toastsService";
import { Pagination, DetailedUser } from "@types";
import { RootState } from "@store";

interface UsersState {
  isLoading: boolean;
  cachedPages: {
    [key: number]: DetailedUser[];
  };
  totalPages: number;
  currentPage: number;
  perPage: number;
  count: number;
}

export const createUser = createAsyncThunk(
  "users/createUser",
  async (
    user: Omit<DetailedUser, "id">,
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const newUser = await usersService.createUser(user);
      const { currentPage, perPage } = (getState() as RootState).users;
      const usersResponse = await usersService.getUsers({
        page: currentPage,
        perPage,
      });

      dispatch(setPageResults({ ...usersResponse, page: currentPage }));
      toastSuccess(`You have successfully created user with id: ${newUser.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: DetailedUser, { getState, dispatch, rejectWithValue }) => {
    try {
      await usersService.updateUser(user);
      const { currentPage, perPage } = (getState() as RootState).users;
      const usersResponse = await usersService.getUsers({
        page: currentPage,
        perPage,
      });

      dispatch(setPageResults({ ...usersResponse, page: currentPage }));
      toastSuccess(`You have successfully updated user with id: ${user.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      await usersService.deleteUser(id);
      const { currentPage, perPage } = (getState() as RootState).users;
      const usersResponse = await usersService.getUsers({
        page: currentPage,
        perPage,
      });

      dispatch(setPageResults({ ...usersResponse, page: currentPage }));
      toastSuccess(`You have successfully deleted user with id: ${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/getUsers",
  async (pagination: Pagination, { getState, dispatch }) => {
    const { perPage } = (getState() as RootState).users;

    if (pagination.perPage !== perPage) {
      dispatch(setPerPage(pagination.perPage));
    }

    const { cachedPages } = (getState() as RootState).users;

    if (cachedPages[pagination.page]) {
      dispatch(setCurrentPage(pagination.page));
    } else {
      const usersResponse = await usersService.getUsers(pagination);

      dispatch(setPageResults({ ...usersResponse, page: pagination.page }));

      return usersResponse;
    }
  }
);

const initialState: UsersState = {
  isLoading: false,
  cachedPages: {},
  totalPages: 1,
  currentPage: 1,
  perPage: 8,
  count: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPerPage: (state, action) => {
      state.cachedPages = {};
      state.totalPages = 1;
      state.currentPage = 1;
      state.count = 0;
      state.perPage = action.payload;
    },
    setPageResults: (state, action) => {
      state.cachedPages[action.payload.page] = action.payload.users;
      state.totalPages = action.payload.totalPages;
      state.count = action.payload.count;
      state.currentPage = action.payload.page;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setPerPage, setPageResults, setCurrentPage } =
  usersSlice.actions;

export default usersSlice.reducer;
