import { Box, Typography, Grid, Avatar, Stack, SxProps } from "@material";
import {
  LocationAndDateFilter,
  SideFilters,
  BikesForRentalList,
} from "@containers";
import avatar01 from "@assets/images/avatar01.png";
import avatar02 from "@assets/images/avatar02.png";
import avatar03 from "@assets/images/avatar03.png";

const $avatar: SxProps = {
  backgroundColor: "grey.200",
  color: "text.primary",
  border: "1px solid",
  borderColor: "background.paper",
};

export default function AvailableRentals() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box sx={{ paddingRight: { md: "2.4rem" } }}>
            <Typography variant="h3">Book bikes in easy steps</Typography>
            <Typography mt={4} color="secondary" variant="subtitle2">
              Renting a bike brings you freedom, and we'll help you find the
              best bike for you at a great price.
            </Typography>
            <Box
              className="trust-stack"
              sx={{ display: "flex", alignItems: "center", mt: 4 }}
            >
              <Stack
                className="avatar-stack"
                sx={{
                  borderRight: "1px solid",
                  borderColor: "grey.200",
                  paddingRight: "1rem",
                }}
                direction="row"
                spacing={-2}
              >
                <Avatar sx={$avatar} alt="Remy Sharp" src={avatar01} />
                <Avatar sx={$avatar} alt="Travis Howard" src={avatar02} />
                <Avatar sx={$avatar} alt="Cindy Baker" src={avatar03} />
                <Avatar sx={$avatar} alt="avatar">
                  +2M
                </Avatar>
              </Stack>
              <Box>
                <Typography
                  sx={{
                    fontSize: "1.4rem",
                    lineHeight: "1.4rem",
                    color: "text.secondary",
                    paddingLeft: "1rem",
                  }}
                >
                  Trusted by 2 million customers
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} sx={{ paddingLeft: { md: "2.4rem" } }}>
          <LocationAndDateFilter />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{ marginTop: "2.8rem", paddingRight: { md: "2.4rem" } }}
        >
          <SideFilters />
        </Grid>
        <Grid item xs={12} md={9} sx={{ paddingLeft: { md: "2.4rem" } }}>
          <BikesForRentalList />
        </Grid>
      </Grid>
    </Box>
  );
}
