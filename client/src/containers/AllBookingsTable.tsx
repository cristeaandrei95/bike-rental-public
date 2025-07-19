import { useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAppSelector, useAppDispatch } from "@store";
import {
  setPerPage,
  cancelBooking,
  completeBooking,
  fetchAllBookings,
} from "@slices/bookingsSlice";
import { Table, DeleteDialogButton } from "@components";
import { Box, TableCell, Typography, Button } from "@material";

dayjs.extend(utc);

interface AdditionalActionsProps {
  onCompleteClick: (item: any) => void;
  onDeleteClick: (item: any) => void;
}

const AdditionalActions =
  ({ onCompleteClick, onDeleteClick }: AdditionalActionsProps) =>
  (item: any) =>
    (
      <>
        <TableCell component="th" scope="row">
          <Button
            component={Link}
            size="small"
            color="info"
            to={`/bookings/${item.userId}`}
          >
            Bookings
          </Button>
        </TableCell>
        <TableCell component="th" scope="row">
          <Button
            size="small"
            color="warning"
            onClick={() => onCompleteClick(item)}
            disabled={item.completed}
          >
            Complete
          </Button>
        </TableCell>

        <TableCell component="th" scope="row">
          <DeleteDialogButton onSubmit={() => onDeleteClick(item)} />
        </TableCell>
      </>
    );

export default function AllBookingsTable() {
  const dispatch = useAppDispatch();
  const { cachedPages, currentPage, perPage, count } = useAppSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchAllBookings({ page: currentPage, perPage }));
  }, [perPage]);

  const columns = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Pickup Date",
    "Pickup & Dropoff Location",
    "Dropoff Date",
    "Price",
    "Rating",
    "Bookings",
    "Complete",
    "Delete",
  ];

  const hiddenFields = ["userId", "completed"];

  const bookings = cachedPages[currentPage] || [];
  const flatBookings = bookings.map((booking) => ({
    id: booking.id,
    name: booking.user.name,
    email: booking.user.email,
    phone: booking.user.phone,
    pickupDate: dayjs(booking.pickupDate).utc(true).format("DD/MM/YYYY HH:mm"),
    pickupLocation: booking.pickupLocation,
    dropoffDate: dayjs(booking.dropoffDate)
      .utc(true)
      .format("DD/MM/YYYY HH:mm"),
    price: booking.price + "$",
    rating: booking.rating || "Unrated",
    userId: booking.user.id,
    completed: booking.completed,
  }));

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(fetchAllBookings({ page: newPage, perPage }));
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPerPage(parseInt(event.target.value, 10)));
  };

  const handleCompleteClick = (item: any) => {
    dispatch(
      completeBooking({
        userId: item.userId,
        bookingId: item.id,
        refetchResults: true,
      })
    );
  };

  const handleDeleteClick = (item: any) => {
    dispatch(
      cancelBooking({
        userId: item.userId,
        bookingId: item.id,
        refetchResults: true,
      })
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ display: "block" }} variant="h3" component="h3">
          Bookings
        </Typography>
      </Box>
      <Box mt={4}>
        <Table
          rowsPerPage={perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          count={count}
          page={currentPage}
          columns={columns}
          rows={flatBookings}
          hiddenFields={hiddenFields}
          additionalActions={AdditionalActions({
            onCompleteClick: handleCompleteClick,
            onDeleteClick: handleDeleteClick,
          })}
        />
      </Box>
    </>
  );
}
