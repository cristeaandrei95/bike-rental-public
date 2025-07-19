import { ReactNode } from "react";
import { Box, SxProps } from "@material";
import bike02 from "@assets/images/bike02.svg";

const $root: SxProps = {
  height: "calc(100vh - 96px)",
  display: "flex",
  alignItems: "center",
};

const $mobileBackground: SxProps = {
  backgroundImage: `url(${bike02})`,
  height: { xs: "100vh", md: "100%" },
  backgroundSize: { xs: "cover", md: "contain" },
  backgroundPositionX: "40%",
  backgroundPositionY: { md: "center" },
  backgroundRepeat: { md: "no-repeat" },
  opacity: { xs: "0.1", md: 1 },
  width: { xs: "100vw", md: "50%" },
  position: { xs: "absolute", md: "relative" },
  top: 0,
  left: 0,
  zIndex: "-1",
};

interface AuthProps {
  children: ReactNode;
}

export default function Auth({ children }: AuthProps) {
  return (
    <Box sx={$root}>
      <Box sx={$mobileBackground}></Box>
      {children}
    </Box>
  );
}
