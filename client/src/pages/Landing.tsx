import { Box, Button, Typography, SxProps } from "@material";
import { Link } from "react-router-dom";
import { ArrowRightAltIcon } from "@icons";
import bike01 from "@assets/images/bike01.svg";

const $root: SxProps = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  height: "calc(100vh - 96px)",
  alignItems: "center",
};

const $imageWrapper: SxProps = {
  width: {
    xs: "100%",
    md: "60%",
  },
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  order: {
    xs: 0,
    md: 1,
  },
};

const $content: SxProps = {
  width: {
    xs: "100%",
    md: "40%",
  },
  paddingRight: {
    md: "6rem",
  },
  marginTop: "2rem",
  order: {
    xs: 1,
    md: 0,
  },
};

const $title: SxProps = {
  fontSize: {
    md: "7.8rem",
  },
  lineHeight: {
    md: "7.6rem",
  },
};

export default function Landing() {
  return (
    <Box sx={$root}>
      <Box sx={$imageWrapper}>
        <img
          style={{
            width: "80%",
          }}
          src={bike01}
          alt="bike"
        />
      </Box>
      <Box sx={$content}>
        <Typography sx={$title} variant="h1" component="h1">
          Premium{" "}
          <Typography sx={$title} variant="h1" component="span" color="primary">
            bike
          </Typography>{" "}
          rental
        </Typography>
        <Typography mt={8} variant="body1">
          We have partnered with the world leading manufacturers and brands to
          create a cross-border experience without sacrificing the confort of
          city rides.
        </Typography>
        <Box mt={8}>
          <Button variant="contained" component={Link} to="/login">
            SEARCH BIKE RENTAL <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
