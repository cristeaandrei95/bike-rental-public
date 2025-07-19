import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auth from "./slices/authSlice";
import users from "./slices/usersSlice";
import bikes from "./slices/bikesSlice";
import locations from "./slices/locationsSlice";
import filters from "./slices/filtersSlice";
import bookings from "./slices/bookingsSlice";

export const store = configureStore({
  reducer: { auth, users, bikes, locations, filters, bookings },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
