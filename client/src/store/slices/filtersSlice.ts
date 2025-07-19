import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import filtersService from "@services/filtersService";
import { Filter } from "@types";

interface filtersState {
  isLoading: boolean;
  filters: Filter[];
}

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const filters = await filtersService.getFilters();

    return filters;
  }
);

const initialState: filtersState = {
  isLoading: false,
  filters: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.filters = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchFilters.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default filtersSlice.reducer;
