import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Shell from "./Shell";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "./types";

const Landing = lazy(() => import("@pages/Landing"));
const AvailableRentals = lazy(() => import("@pages/AvailableRentals"));
const BikeDetails = lazy(() => import("@pages/BikeDetails"));
const Accounts = lazy(() => import("@pages/Accounts"));
const ManageBikes = lazy(() => import("@pages/ManageBikes"));
const MyBookings = lazy(() => import("@pages/MyBookings"));
const UserBookings = lazy(() => import("@pages/UserBookings"));
const AllBookings = lazy(() => import("@pages/AllBookings"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@pages/ResetPassword"));
const NotFound = lazy(() => import("@pages/NotFound"));

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route
            path="/"
            element={
              <ProtectedRoute
                allowedRoles={[Role.ANONYMOUS]}
                redirectTo="/available-rentals"
              >
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute
                allowedRoles={[Role.ANONYMOUS]}
                redirectTo="/available-rentals"
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute
                allowedRoles={[Role.ANONYMOUS]}
                redirectTo="/available-rentals"
              >
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRoute
                allowedRoles={[Role.ANONYMOUS]}
                redirectTo="/available-rentals"
              >
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRoute
                allowedRoles={[Role.ANONYMOUS]}
                redirectTo="/available-rentals"
              >
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="available-rentals"
            element={
              <ProtectedRoute
                allowedRoles={[Role.MANAGER, Role.USER]}
                redirectTo="/login"
              >
                <AvailableRentals />
              </ProtectedRoute>
            }
          />

          <Route
            path="bike/:bikeId"
            element={
              <ProtectedRoute
                allowedRoles={[Role.MANAGER, Role.USER]}
                redirectTo="/login"
              >
                <BikeDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-bookings"
            element={
              <ProtectedRoute allowedRoles={[Role.USER]} redirectTo="/login">
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="bookings"
            element={
              <ProtectedRoute allowedRoles={[Role.MANAGER]} redirectTo="/login">
                <AllBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="bookings/:userId"
            element={
              <ProtectedRoute
                allowedRoles={[Role.MANAGER]}
                redirectTo="/my-bookings"
              >
                <UserBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="accounts"
            element={
              <ProtectedRoute allowedRoles={[Role.MANAGER]} redirectTo="/login">
                <Accounts />
              </ProtectedRoute>
            }
          />

          <Route
            path="manage-bikes"
            element={
              <ProtectedRoute allowedRoles={[Role.MANAGER]} redirectTo="/login">
                <ManageBikes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
