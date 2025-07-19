import { Box, Typography, Grid, Paper } from "@material";
import { Link } from "react-router-dom";
import { UNRATED_SCORE } from "@constants";
import { Bike } from "@types";
import { FullStar } from "@icons";

interface Props {
  bike: Bike;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
}

export default function BikeCard({
  bike,
  pickupLocation,
  dropoffLocation,
  pickupDate,
  dropoffDate,
}: Props) {
  return (
    <Grid item xs={12} md={3}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/bike/${bike.id}?pickupLocation=${pickupLocation}&dropoffLocation=${dropoffLocation}&pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`}
      >
        <Paper
          sx={{
            p: 4,
            border: "1px solid",
            borderColor: "divider",
            ":hover": { borderColor: "grey.400" },
          }}
          elevation={0}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "1.6rem", fontWeight: "bold" }}>
              {bike.model}
            </Typography>
            <Box
              sx={{ color: "var(--star-color)", display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ mt: 1 }}>
                {bike.rating ? bike.rating : UNRATED_SCORE}
              </Typography>
              <FullStar />
            </Box>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              style={{ width: "100%" }}
              src={bike.imageUrl}
              alt={bike.model}
            />
          </Box>

          <Typography sx={{ fontSize: "1.4rem", textAlign: "center", }}>
            Book for{" "}
            <Typography sx={{ color: "var(--text-price)" }} component="span">
              {bike.priceForInterval}
            </Typography>
          </Typography>
        </Paper>
      </Link>
    </Grid>
  );
}
