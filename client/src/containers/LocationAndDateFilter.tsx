import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Box,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  LocalizationProvider,
  DateTimePicker,
  TextField,
  AdapterDayjs,
  SxProps,
} from "@material";
import { useAppSelector, useAppDispatch } from "@store";
import { fetchLocations } from "@slices/locationsSlice";

dayjs.extend(utc);

const $root: SxProps = {
  display: "flex",
  flexWrap: "wrap",
  mt: { xs: 4, md: 0 },
  border: "1px solid",
  borderColor: "divider",
};

const $inputs: SxProps = {
  p: 4,
  width: { xs: "100%", sm: "50%" },
  ".MuiInputBase-input, .MuiFilledInput-root, .MuiInputLabel-root": {
    fontSize: "1.4rem",
  },
  "button svg.MuiSvgIcon-root": {
    fontSize: "2rem",
  },
};

export default function LocationAndDateFilter() {
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, locations } = useAppSelector((state) => state.locations);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Dayjs>(dayjs());
  const [dropoffDate, setDropoffDate] = useState<Dayjs>(dayjs().endOf("day"));

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchLocations());

      const qs = {
        pickupLocation: searchParams.get("pickupLocation"),
        dropoffLocation: searchParams.get("dropoffLocation"),
        pickupDate: searchParams.get("pickupDate"),
        dropoffDate: searchParams.get("dropoffDate"),
      };

      if (qs.pickupLocation && qs.pickupLocation !== null) {
        setPickupLocation(qs.pickupLocation);
      }

      if (qs.dropoffLocation && qs.dropoffLocation !== null) {
        setDropoffLocation(qs.dropoffLocation);
      }

      if (qs.pickupDate && qs.pickupDate !== null) {
        setPickupDate(dayjs(qs.pickupDate));
      }

      if (qs.dropoffDate && qs.dropoffDate !== null) {
        setDropoffDate(dayjs(qs.dropoffDate));
      }
    }
  }, []);

  useEffect(() => {
    setSearchParams({
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      pickupDate: pickupDate.utc().format(),
      dropoffDate: dropoffDate.utc().format(),
    });
  }, [pickupLocation, dropoffLocation, pickupDate, dropoffDate]);

  const handlePickupLocationChange = (event: any) => {
    setPickupLocation(event.target.value);
    setDropoffLocation(event.target.value);
  };

  const handleDropOffLocationChange = (event: any) => {
    setDropoffLocation(event.target.value);
  };

  const handlePickupDateTimeChange = (date: any) => {
    setPickupDate(date);
    setDropoffDate(date.endOf("day"));
  };

  const handleDropOffDateTimeChange = (date: any) => {
    setDropoffDate(date);
  };

  return (
    <Paper sx={$root} elevation={0}>
      <Box sx={{ ...$inputs, paddingRight: 2 }}>
        {Boolean(locations.length) && (
          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel id="pickup-loation">Pick-up Location</InputLabel>
            <Select
              labelId="pickup-loation"
              id="pickup-loation"
              name="pickup-loation"
              label="pickup-loation"
              value={pickupLocation}
              onChange={handlePickupLocationChange}
            >
              {locations &&
                locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </Box>
      <Box sx={{ ...$inputs, paddingLeft: 2 }}>
        {Boolean(locations.length) && (
          <FormControl sx={{ width: "100%" }} variant="filled">
            <InputLabel id="dropoff-location">Drop-off Location</InputLabel>
            <Select
              labelId="dropoff-location"
              id="dropoff-location"
              name="dropoff-location"
              label="dropoff-location"
              value={dropoffLocation}
              onChange={handleDropOffLocationChange}
            >
              {locations && pickupLocation ? (
                <MenuItem value={pickupLocation}>{pickupLocation}</MenuItem>
              ) : (
                locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        )}
      </Box>

      <Box sx={{ ...$inputs, paddingRight: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} variant="filled" />}
            label="Pick-up Date and Time"
            value={pickupDate}
            minDate={dayjs()}
            onChange={handlePickupDateTimeChange}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ ...$inputs, paddingLeft: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} variant="filled" />}
            label="Drop-off Date and Time"
            value={dropoffDate}
            minDate={pickupDate}
            onChange={handleDropOffDateTimeChange}
          />
        </LocalizationProvider>
      </Box>
    </Paper>
  );
}
