import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Paper,
  SxProps,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material";
import { useAppSelector, useAppDispatch } from "@store";
import { fetchFilters } from "@slices/filtersSlice";

const $root: SxProps = {
  p: 4,
  display: "flex",
  flexWrap: "wrap",
  mt: { xs: 4, md: 0 },
  border: "1px solid",
  borderColor: "divider",
};

const $formControlLabel: SxProps = {
  width: "100%",
  ".MuiCheckbox-root": {
    padding: "0 4px",
  },
  ".MuiTypography-root": {
    fontSize: "1.2rem",
  },
};

export default function SideFilters() {
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, filters } = useAppSelector((state) => state.filters);
  const [checkedFilters, setCheckedFilters] = useState<{
    [filterName: string]: string[];
  }>({});

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchFilters());
    }
  }, []);

  const handleChange =
    (filterName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;

      if (checked) {
        setCheckedFilters({
          ...checkedFilters,
          [filterName]: [...(checkedFilters[filterName] || []), name],
        });
      } else {
        setCheckedFilters({
          ...checkedFilters,
          [filterName]: checkedFilters[filterName].filter(
            (value) => value !== name
          ),
        });
      }
    };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const QSParams: { [key: string]: string } = {};
    // @ts-ignore
    for (let [key, value] of params.entries()) {
      if (!value) continue;
      QSParams[key] = value;
    }

    for (const filterName in checkedFilters) {
      const filterQSName = filterName.toLowerCase();
      QSParams[filterQSName] = checkedFilters[filterName].join(",");
    }

    setSearchParams(QSParams);
  }, [checkedFilters]);

  return (
    <Paper sx={$root} elevation={0}>
      <Typography
        sx={{ fontSize: "1.8rem", marginBottom: "-1rem" }}
        variant="h3"
      >
        Filter by
      </Typography>
      <Box sx={{ marginLeft: "1rem", marginTop: "1rem" }}>
        {filters.map((filter) => (
          <Box key={filter.label}>
            <Typography sx={{ py: 2, fontSize: "1.4rem" }}>
              {filter.label}
            </Typography>

            {filter.items.map((item) => (
              <FormControlLabel
                key={item}
                sx={$formControlLabel}
                control={
                  <Checkbox
                    sx={{ p: 1, marginLeft: "2rem" }}
                    id={item}
                    name={item}
                    onChange={handleChange(filter.label)}
                  />
                }
                label={item}
              />
            ))}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
