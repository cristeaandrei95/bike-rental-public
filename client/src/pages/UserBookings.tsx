import { BookingsListing } from "@containers";
import { Box, Typography } from "@material";

export default function UserBookings() {
  return (
    <Box>
      <Typography variant="h3" component="h3">
        User bookings
      </Typography>
      <BookingsListing />
    </Box>
  );
}
