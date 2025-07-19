import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, GlobalLoader } from "@components";
import { Box, SxProps } from "@material";
import { useAppSelector } from "@store";
import { setAuthTokenOnAxios } from "@services/api/apiService";

const $container: SxProps = {
  mx: {
    xs: "2rem",
    md: "8rem",
  },
};

export default function Shell() {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setAuthTokenOnAxios(token);
    }
  });

  return (
    <Box sx={$container}>
      <Header />
      <Box py={4}>
        <Suspense fallback={<GlobalLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
