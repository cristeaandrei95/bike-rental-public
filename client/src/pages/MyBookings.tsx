import { BookingsListing } from "@containers";
import { Box, Typography } from "@material";

export default function MyBookings() {
  return (
    <Box>
      <Typography variant="h3" component="h3">
        My bookings
      </Typography>
      <BookingsListing />
    </Box>
  );
}
