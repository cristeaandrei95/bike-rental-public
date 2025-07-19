import { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box, Typography, Grid } from "@material";
import { useAppDispatch, useAppSelector } from "@store";
import {
  fetchBookings,
  cancelBooking,
  completeBooking,
  createBookingRating,
} from "@slices/bookingsSlice";
import { BookingCard } from "@components";
import { DirectionsBikeIcon } from "@icons";
import { Role, Booking } from "@types";

dayjs.extend(utc);

export default function BookingsListing() {
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, bookings } = useAppSelector((state) => state.bookings);
  const { userId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.role === Role.MANAGER && userId) {
      dispatch(fetchBookings(+userId));
    } else {
      // @ts-ignore
      dispatch(fetchBookings(user.id));
    }
  }, []);

  const handleBookingAction = async (bookingId: number) => {
    if (user.role === Role.MANAGER && userId) {
      await dispatch(completeBooking({ userId: +userId, bookingId }));
      dispatch(fetchBookings(+userId));
    } else {
      // @ts-ignore
      await dispatch(cancelBooking({ userId: user.id, bookingId }));
      // @ts-ignore
      dispatch(fetchBookings(user.id));
    }
  };

  const handleRatingSubmit = (booking: Booking) => async (score: number) => {
    await dispatch(
      createBookingRating({
        userId: booking.userId,
        bookingId: booking.id,
        score,
      })
    );
    // @ts-ignore
    dispatch(fetchBookings(user.id));
  };

  return (
    <Grid container spacing={8}>
      {bookings.map((booking) => (
        <Grid key={booking.id} item xs={12} sm={6} md={12}>
          <Typography
            sx={{ mt: 8, ontSize: "1.4rem", color: "text.secondary" }}
          >
            {dayjs(booking.pickupDate).utc(true).format("DD/MM/YYYY HH:mm")} -{" "}
            {booking.pickupLocation}
            <DirectionsBikeIcon
              className="bike-icon"
              sx={{ margin: "0 2rem" }}
            />
            {dayjs(booking.dropoffDate).utc(true).format("DD/MM/YYYY HH:mm")} -{" "}
            {booking.dropoffLocation}
          </Typography>
          <BookingCard
            booking={booking}
            isUser={user.role === Role.USER}
            isLoading={isLoading}
            onClick={() => handleBookingAction(booking.id)}
            onRatingSubmit={handleRatingSubmit(booking)}
          />
        </Grid>
      ))}
      {!Boolean(bookings.length) && (
        <Box
          sx={{
            height: "calc( 100vh - 10rem)",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "text.secondary" }} variant="h4">
            {user.role === Role.USER
              ? "You don't have any bookings yet."
              : "This user doesn't have any bookings yet."}
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
