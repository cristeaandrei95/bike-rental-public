import { useState, MouseEvent } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  MenuItem,
  Typography,
  SxProps,
  Drawer,
} from "@material";
import { MenuIcon, ArrowDropDownIcon } from "@icons";
import { NavLink } from "@components";
import logo from "@assets/images/logo.svg";
import { useAppSelector, useAppDispatch } from "@store";
import { logout } from "@slices/authSlice";
import { Role } from "@types";
import { stringAvatar } from "@utils";

const userPages = [
  {
    to: "/available-rentals",
    label: "Available Rentals",
  },
  {
    to: "/my-bookings",
    label: "My Bookings",
  },
];

const managerPages = [
  {
    to: "/available-rentals",
    label: "Available Rentals",
  },
  {
    to: "/accounts",
    label: "Accounts",
  },
  {
    to: "/bookings",
    label: "Bookings",
  },
  {
    to: "/manage-bikes",
    label: "Manage Bikes",
  },
];

const $toolbar = (isAuthenticated: boolean): SxProps => ({
  borderBottom: "1px solid",
  borderColor: isAuthenticated ? "divider" : "transparent",
});

const $desktopLinks: SxProps = {
  flexGrow: 1,
  justifyContent: "space-between",
  display: { xs: "none", md: "flex" },
};

const $hamburgerWrapper: SxProps = {
  width: "100%",
  display: { xs: "flex", md: "none" },
  justifyContent: "flex-end",
};

const $drawer: SxProps = {
  ".MuiPaper-root": {
    width: "80%",
    padding: "2rem 0",
  },
};

const $logout: SxProps = {
  justifyContent: "center",
  fontSize: "1.6rem",
  fontWeight: "bold",
  color: "text.primary",
};

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    handleDrawerClose();
    dispatch(logout());
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={$toolbar(isAuthenticated)} disableGutters>
          <img src={logo} alt="logo" />

          {isAuthenticated && (
            <>
              <Box sx={$hamburgerWrapper}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  sx={$drawer}
                  anchor="right"
                  open={isDrawerOpen}
                  onClose={handleDrawerClose}
                >
                  {(user.role === Role.MANAGER ? managerPages : userPages).map(
                    ({ to, label }) => (
                      <NavLink key={label} onClick={handleDrawerClose} to={to}>
                        {label}
                      </NavLink>
                    )
                  )}
                  <Box sx={{ height: "100%" }} />
                  <MenuItem sx={$logout} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Drawer>
              </Box>

              <Box sx={$desktopLinks} ml={6}>
                <Box sx={{ display: "flex" }}>
                  {(user.role === Role.MANAGER ? managerPages : userPages).map(
                    ({ to, label }) => (
                      <NavLink key={label} to={to}>
                        {label}
                      </NavLink>
                    )
                  )}
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Avatar
                    alt="User initials"
                    {...stringAvatar(user.name || "")}
                  />

                  <IconButton onClick={handleOpenUserMenu}>
                    <ArrowDropDownIcon />
                  </IconButton>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
