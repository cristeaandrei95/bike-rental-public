import { Box, CircularProgress, SxProps } from "@material";

const $root: SxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "var(--global-loader-bg)",
  zIndex: 10,
};

export default function GlobalLoader() {
  return (
    <Box sx={$root}>
      <CircularProgress />
    </Box>
  );
}
