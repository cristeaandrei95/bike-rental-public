import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bikesService from "@services/bikesService";
import { toastSuccess, toastError } from "@services/toastsService";
import { BikeParams, Bike, BikeByIDParams } from "@types";
import { RootState } from "@store";

interface BikesState {
  isLoading: boolean;
  currentBike: Bike | null;
  cachedPages: {
    [key: number]: Bike[];
  };
  totalPages: number;
  currentPage: number;
  perPage: number;
  count: number;
}

export const createBike = createAsyncThunk(
  "bikes/createBike",
  async (
    { bike, file }: { bike: Partial<Bike>; file: File },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const newBike = await bikesService.createBike({ bike, file });
      const { currentPage, perPage } = (getState() as RootState).bikes;
      const bikesResponse = await bikesService.getBikes({
        page: currentPage,
        perPage,
      });

      dispatch(setPageResults({ ...bikesResponse, page: currentPage }));
      toastSuccess(`You have successfully created bike with id: ${newBike.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const updateBike = createAsyncThunk(
  "bikes/updateBike",
  async (bike: Bike, { getState, dispatch, rejectWithValue }) => {
    try {
      await bikesService.updateBike(bike);
      const { currentPage, perPage } = (getState() as RootState).bikes;
      const bikesResponse = await bikesService.getBikes({
        page: currentPage,
        perPage,
      });

      dispatch(setPageResults({ ...bikesResponse, page: currentPage }));
      toastSuccess(`You have successfully updated bike with id: ${bike.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const deleteBike = createAsyncThunk(
  "bikes/deleteBike",
  async (id: number, { getState, dispatch, rejectWithValue }) => {
    try {
      await bikesService.deleteBike(id);
      const { currentPage, perPage } = (getState() as RootState).bikes;
      const bikesResponse = await bikesService.getBikes({
        page: currentPage,
        perPage,
      });

      dispatch(setPageResults({ ...bikesResponse, page: currentPage }));
      toastSuccess(`You have successfully deleted bike with id: ${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const fetchBikes = createAsyncThunk(
  "bikes/fetchBikes",
  async (params: BikeParams, { getState, dispatch }) => {
    const { perPage } = (getState() as RootState).bikes;

    if (params.perPage !== perPage) {
      dispatch(setPerPage(params.perPage));
    }

    const bikes = (getState() as RootState).bikes;

    if (bikes.cachedPages[params.page]) {
      dispatch(setCurrentPage(params.page));
    } else {
      const bikesResponse = await bikesService.getBikes(params);

      dispatch(setPageResults({ ...bikesResponse, page: params.page }));

      return bikesResponse;
    }
  }
);

export const fetchBikeByID = createAsyncThunk(
  "bikes/fetchBikeByID",
  async (params: BikeByIDParams, { rejectWithValue }) => {
    try {
      const bikesResponse = await bikesService.getBikeById(params);
      
      return bikesResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

const initialState: BikesState = {
  isLoading: false,
  currentBike: null,
  cachedPages: {},
  totalPages: 1,
  currentPage: 1,
  perPage: 8,
  count: 0,
};

const bikesSlice = createSlice({
  name: "bikes",
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
      state.cachedPages[action.payload.page] = action.payload.bikes;
      state.totalPages = action.payload.totalPages;
      state.count = action.payload.count;
      state.currentPage = action.payload.page;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetBikesState(state) {
      state.isLoading = false;
      state.cachedPages = {};
      state.totalPages = 1;
      state.currentPage = 1;
      state.count = 0;
      state.perPage = 8;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBikeByID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBikeByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentBike = action.payload as Bike;
    });
    builder.addCase(fetchBikeByID.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchBikes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBikes.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchBikes.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateBike.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateBike.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateBike.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBike.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBike.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBike.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createBike.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBike.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createBike.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setPerPage, setPageResults, setCurrentPage, resetBikesState } =
  bikesSlice.actions;

export default bikesSlice.reducer;
