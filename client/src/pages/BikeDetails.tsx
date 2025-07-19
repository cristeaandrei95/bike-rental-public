import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Box, Typography, Grid, SxProps, Button, Checkbox } from "@material";
import { StarStack } from "@components";
import { ArrowBackIcon } from "@icons";
import { useAppDispatch, useAppSelector } from "@store";
import { fetchBikeByID } from "@slices/bikesSlice";
import { createBooking } from "@slices/bookingsSlice";
import { Role } from "@types";

dayjs.extend(utc);

const $bikeProperty: SxProps = {
  fontSize: "1.8rem",
  fontWeight: "400",
  marginTop: "1.2rem",
  color: "text.secondary",
};

const $price: SxProps = {
  color: "var(--text-price)",
  fontSize: "2.4rem",
  fontWeight: "600",
  marginTop: "1.2rem",
};

export default function BikeDetails() {
  let { bikeId } = useParams<"bikeId">();
  let [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation") || "";
  const dropoffLocation = searchParams.get("dropoffLocation") || "";
  const pickupDate = searchParams.get("pickupDate") || "";
  const dropoffDate = searchParams.get("dropoffDate") || "";
  const dispatch = useAppDispatch();
  const { currentBike } = useAppSelector((state) => state.bikes);
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.bookings);
  const isManager = user?.role === Role.MANAGER;

  useEffect(() => {
    dispatch(
      fetchBikeByID({
        id: bikeId || "",
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
      })
    );
  }, [bikeId]);

  const handleCreateBooking = async () => {
    if (user && user.id && currentBike && currentBike.id) {
      const booking = {
        userId: +user.id,
        bikeId: +currentBike.id,
        pickupDate,
        pickupLocation,
        dropoffDate,
        dropoffLocation,
      };

      await dispatch(createBooking(booking));
      dispatch(
        fetchBikeByID({
          id: bikeId || "",
          pickupLocation,
          dropoffLocation,
          pickupDate,
          dropoffDate,
        })
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        sx={{
          textDecoration: "none",
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
          "&:hover": { color: "text.primary" },
          cursor: "pointer",
        }}
        variant="h3"
        onClick={() => window.history.go(-1)}
      >
        <ArrowBackIcon sx={{ marginRight: "1.2rem" }} />
        Back to rental list
      </Typography>

      {currentBike ? (
        <Grid mt={8} container spacing={2}>
          <Grid
            sx={{ display: "flex", alignItems: "center", paddingRight: "2rem" }}
            item
            xs={12}
            md={6}
          >
            <Box
              sx={{
                padding: {
                  xs: "2.4rem",
                  sm: "6.4rem",
                  md: "4.8rem",
                },
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <img
                style={{ width: "100%" }}
                src={currentBike.imageUrl}
                alt={currentBike.model}
              />
            </Box>
          </Grid>
          <Grid
            sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            item
            xs={12}
            md={6}
          >
            <Grid container spacing={2}>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Model</Typography>
                <Typography sx={$bikeProperty}>{currentBike.model}</Typography>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Color</Typography>
                <Typography sx={$bikeProperty}>{currentBike.color}</Typography>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Pick-up location</Typography>
                <Typography sx={$bikeProperty}>{pickupLocation}</Typography>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Drop-off location</Typography>
                <Typography sx={$bikeProperty}>{dropoffLocation}</Typography>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Pick-up Time</Typography>
                <Typography sx={$bikeProperty}>
                  {dayjs.utc(pickupDate).local().format("DD/MM/YYYY HH:mm")}
                </Typography>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Drop-off Time</Typography>
                <Typography sx={$bikeProperty}>
                  {dayjs.utc(dropoffDate).local().format("DD/MM/YYYY HH:mm")}
                </Typography>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Rating</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "var(--star-color)",
                    marginTop: "0.8rem",
                  }}
                >
                  <StarStack stars={currentBike.rating} />
                  <Typography sx={{ marginLeft: "0.5rem" }}>
                    ({currentBike.rating})
                  </Typography>
                </Box>
              </Grid>
              <Grid mt={4} item xs={12} sm={6}>
                <Typography variant="h4">Availability for timeframe</Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    id="isAvailable"
                    name="isAvailable"
                    checked={currentBike.isAvailable}
                    disabled
                  />
                  <Typography
                    variant="h5"
                    color={currentBike.isAvailable ? "#4caf50" : "error"}
                  >
                    {currentBike.isAvailable ? "Available" : "Not Available"}
                  </Typography>
                </Box>
              </Grid>
              <Grid mt={1} item xs={12} sm={6}>
                <Typography variant="h4">Price for timeframe</Typography>
                <Typography sx={$price}>
                  {currentBike.priceForInterval}
                </Typography>
              </Grid>
              <Grid mt={8} item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isLoading || isManager || !currentBike.isAvailable}
                  onClick={handleCreateBooking}
                >
                  {isLoading ? "Creating booking..." : "Book Now"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
