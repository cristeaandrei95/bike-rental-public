import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import bookingsService from "@services/bookingsService";
import { toastSuccess, toastError } from "@services/toastsService";
import { RootState } from "@store";
import {
  AllBooking,
  Booking,
  NewBooking,
  BookingStatus,
  Pagination,
} from "@types";

interface BookingsSlice {
  isLoading: boolean;
  cachedPages: {
    [key: number]: AllBooking[];
  };
  bookings: Booking[];
  status: BookingStatus | null;
  totalPages: number;
  currentPage: number;
  perPage: number;
  count: number;
}

export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (booking: NewBooking, { rejectWithValue }) => {
    try {
      await bookingsService.createBooking(booking);

      toastSuccess(
        `You have successfully created a new booking, you can see it in your bookings section.`
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (userId: number) => {
    return await bookingsService.getBookingsByUser(userId);
  }
);

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (
    {
      userId,
      bookingId,
      refetchResults = false,
    }: { userId: number; bookingId: number; refetchResults?: boolean },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await bookingsService.deleteBooking({ userId, bookingId });

      if (refetchResults) {
        const { currentPage, perPage } = (getState() as RootState).bikes;
        const response = await bookingsService.getBookings({
          page: currentPage,
          perPage,
        });

        dispatch(setPageResults({ ...response, page: currentPage }));
      }

      toastSuccess(`You have successfully deleted the booking.`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const completeBooking = createAsyncThunk(
  "bookings/completeBooking",
  async (
    {
      userId,
      bookingId,
      refetchResults = false,
    }: { userId: number; bookingId: number; refetchResults?: boolean },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      await bookingsService.updateBooking({
        userId,
        bookingId,
        payload: { completed: true },
      });

      if (refetchResults) {
        const { currentPage, perPage } = (getState() as RootState).bikes;
        const response = await bookingsService.getBookings({
          page: currentPage,
          perPage,
        });

        dispatch(setPageResults({ ...response, page: currentPage }));
      }

      toastSuccess(`You have successfully updated booking ${bookingId}.`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error?.response?.data.message);
      }

      rejectWithValue(true);
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async (pagination: Pagination, { getState, dispatch }) => {
    const { perPage } = (getState() as RootState).bookings;

    if (pagination.perPage !== perPage) {
      dispatch(setPerPage(pagination.perPage));
    }

    const { cachedPages } = (getState() as RootState).bookings;

    if (cachedPages[pagination.page]) {
      dispatch(setCurrentPage(pagination.page));
    } else {
      const response = await bookingsService.getBookings(pagination);

      dispatch(setPageResults({ ...response, page: pagination.page }));

      return response;
    }
  }
);

export const createBookingRating = createAsyncThunk(
  "bookings/createBookingRating",
  async (ratingData: { userId: number; bookingId: number; score: number }) => {
    return await bookingsService.createBookingRating(ratingData);
  }
);

const initialState: BookingsSlice = {
  isLoading: false,
  bookings: [],
  status: null,
  cachedPages: {},
  totalPages: 1,
  currentPage: 1,
  perPage: 8,
  count: 0,
};

const bookingsSlice = createSlice({
  name: "bookings",
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
      state.cachedPages[action.payload.page] = action.payload.bookings;
      state.totalPages = action.payload.totalPages;
      state.count = action.payload.count;
      state.currentPage = action.payload.page;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBooking.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createBooking.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createBookingRating.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createBookingRating.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createBookingRating.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchAllBookings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBookings.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchAllBookings.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchBookings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload;
    });
    builder.addCase(fetchBookings.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(cancelBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelBooking.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(cancelBooking.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(completeBooking.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(completeBooking.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(completeBooking.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setPerPage, setPageResults, setCurrentPage } =
  bookingsSlice.actions;

export default bookingsSlice.reducer;
