import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store";
import { fetchBikes, resetBikesState } from "@slices/bikesSlice";
import { BikeCard } from "@components";
import { Box, Typography, Pagination, Grid } from "@material";
import { BikeParams } from "@types";

export default function BikesForRentalList() {
  const dispatch = useAppDispatch();
  let [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation") || "";
  const dropoffLocation = searchParams.get("dropoffLocation") || "";
  const pickupDate = searchParams.get("pickupDate") || "";
  const dropoffDate = searchParams.get("dropoffDate") || "";
  const model = searchParams.get("model") || "";
  const color = searchParams.get("color") || "";
  const rating = searchParams.get("rating") || "";

  const { cachedPages, currentPage, perPage, totalPages } =
    useAppSelector((state) => state.bikes);

  useEffect(() => {
    dispatch(resetBikesState());
  }, []);

  useEffect(() => {
    if (pickupLocation && dropoffLocation && pickupDate && dropoffDate) {
      const params: BikeParams = {
        page: currentPage,
        perPage,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
      };

      if (model) {
        params.model = model;
      }

      if (color) {
        params.color = color;
      }

      if (rating) {
        params.rating = rating;
      }

      dispatch(resetBikesState());
      dispatch(fetchBikes(params));
    }
  }, [
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    model,
    color,
    rating,
  ]);

  const bikes = cachedPages[currentPage] || [];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (pickupLocation && dropoffLocation && pickupDate && dropoffDate) {
      const params: BikeParams = {
        page: value,
        perPage,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
      };

      if (model) {
        params.model = model;
      }

      if (color) {
        params.color = color;
      }

      if (rating) {
        params.rating = rating;
      }

      dispatch(resetBikesState());
      dispatch(fetchBikes(params));
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "2.4rem",
        }}
      >
        <Typography variant="h3" component="span">
          Bikes for rental
        </Typography>

        {Boolean(bikes.length) && (
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Box>

      <Grid sx={{ marginTop: "0rem" }} container spacing={4}>
        {bikes.map((bike) => (
          <BikeCard
            key={bike.id}
            bike={bike}
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            pickupDate={pickupDate}
            dropoffDate={dropoffDate}
          />
        ))}
      </Grid>
      {!Boolean(bikes.length) && (
        <Box
          sx={{
            height: "calc( 100% - 100px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ padding: '5rem 0', color: "text.secondary" }} variant="h4">
            Please select a location & date to see available bikes
          </Typography>
        </Box>
      )}
    </>
  );
}
