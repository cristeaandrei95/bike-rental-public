import apiService from "./api/apiService";
import { NewBooking, Booking, Pagination } from "@types";

const bookingsService = {
  createBooking: async (newBooking: NewBooking) => {
    const response = await apiService.post(
      `/users/${newBooking.userId}/bookings`,
      newBooking
    );

    return response.data;
  },

  createBookingRating: async ({
    userId,
    bookingId,
    score,
  }: {
    userId: number;
    bookingId: number;
    score: number;
  }) => {
    const response = await apiService.post(
      `/users/${userId}/bookings/${bookingId}/ratings`,
      {
        score,
      }
    );

    return response.data;
  },

  getBookings: async ({ page, perPage }: Pagination) => {
    const response = await apiService.get("/bookings", {
      params: {
        page,
        perPage,
      },
    });

    return response.data;
  },

  getBookingsByUser: async (userId: number) => {
    const response = await apiService.get(`/users/${userId}/bookings`);

    return response.data;
  },

  deleteBooking: async ({
    userId,
    bookingId,
  }: {
    userId: number;
    bookingId: number;
  }) => {
    const response = await apiService.delete(
      `/users/${userId}/bookings/${bookingId}`
    );

    return response.data;
  },

  updateBooking: async ({
    bookingId,
    payload,
  }: {
    userId: number;
    bookingId: number;
    payload: Partial<Booking>;
  }) => {
    const response = await apiService.patch(`/bookings/${bookingId}`, payload);

    return response.data;
  },
};

export default bookingsService;
