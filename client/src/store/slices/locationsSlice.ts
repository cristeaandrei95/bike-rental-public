import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationsService from "@services/locationsService";

interface LocationsState {
  isLoading: boolean;
  locations: string[];
}

export const fetchLocations = createAsyncThunk(
  "location/fetchLocations",
  async () => {
    const locations = await locationsService.getLocations();

    return locations;
  }
);

const initialState: LocationsState = {
  isLoading: false,
  locations: [],
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLocations.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default locationsSlice.reducer;
