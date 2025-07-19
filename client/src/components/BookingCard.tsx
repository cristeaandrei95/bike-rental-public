import { useState } from "react";
import { Typography, SxProps, Paper, Box, Grid, Button } from "@material";
import { StarStack } from "@components";
import { Booking } from "@types";

interface Props {
  isLoading: boolean;
  isUser: boolean;
  booking: Booking;
  onClick: () => void;
  onRatingSubmit: (score: number) => void;
}

const $bikeProperty: SxProps = {
  fontSize: "1.4rem",
  fontWeight: "400",
  marginTop: "0.4rem",
  color: "text.secondary",
};

export default function BookingCard({
  booking,
  isLoading,
  isUser,
  onClick,
  onRatingSubmit,
}: Props) {
  const [score, setScore] = useState(0);

  const handleScoreChange = (score: number) => {
    setScore(score);
  };

  const handleRatingSubmission = () => {
    if (score > 0) {
      onRatingSubmit(score);
    }
  };

  const isRatable = booking.completed && booking.rating?.length === 0;

  return (
    <Paper sx={{ mt: 6 }}>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem 0 1rem 3.5rem",
        }}
        container
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={2}>
          <Box>
            <img style={{ width: "100%" }} src={booking.bike.imageUrl} alt="Bike thumbnail" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box>
            <Typography variant="h4">Model</Typography>
            <Typography sx={$bikeProperty}>{booking.bike.model}</Typography>
          </Box>
          <Box mt={4}>
            <Typography variant="h4">Color</Typography>
            <Typography sx={$bikeProperty}>{booking.bike.color}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Box>
            <Typography variant="h4">Price</Typography>
            <Typography sx={$bikeProperty}>{booking.price}$</Typography>
          </Box>
          <Box mt={4}>
            <Typography variant="h4">Payment</Typography>
            <Typography sx={$bikeProperty}>Cash (at the desk)</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h4">
            {isRatable
              ? isUser
                ? "Your Rating"
                : "Unrated by user"
              : "Average Rating"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "var(--star-color)",
              marginTop: "0.8rem",
            }}
          >
            {isUser ? (
              <StarStack
                isRatable={isRatable}
                stars={isRatable ? score : booking.bike.rating}
                onRatingClick={handleScoreChange}
              />
            ) : (
              <StarStack
                isRatable={isRatable}
                stars={isRatable ? score : booking.bike.rating}
              />
            )}

            <Typography sx={{ marginLeft: "0.5rem" }}>
              ({isRatable ? score : booking.bike.rating})
            </Typography>
          </Box>
        </Grid>
        <Grid
          sx={{ display: "flex", justifyContent: "center" }}
          item
          xs={12}
          sm={12}
          md={4}
        >
          {isUser ? (
            booking.completed ? (
              isRatable ? (
                <Button
                  sx={{
                    margin: {
                      xs: "2rem 0",
                      md: 0,
                    },
                  }}
                  variant="contained"
                  color="warning"
                  onClick={handleRatingSubmission}
                >
                  Rate you booking
                </Button>
              ) : (
                <Button
                  sx={{
                    margin: {
                      xs: "2rem 0",
                      md: 0,
                    },
                  }}
                  variant="contained"
                  color="warning"
                  disabled
                >
                  Rating submitted
                </Button>
              )
            ) : (
              <Button
                sx={{
                  margin: {
                    xs: "2rem 0",
                    md: 0,
                  },
                }}
                variant="contained"
                color="error"
                onClick={onClick}
              >
                Cancel Reservation
              </Button>
            )
          ) : (
            <Button
              sx={{
                margin: {
                  xs: "2rem 0",
                  md: 0,
                },
              }}
              variant="contained"
              color="warning"
              onClick={onClick}
              disabled={booking.completed || isLoading}
            >
              {booking.completed ? "Completed" : "Complete booking"}
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
