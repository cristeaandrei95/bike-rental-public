import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
export { createTheme };
export type { SxProps } from "@mui/system";
export type { Theme } from "@mui/material";
export { default as CircularProgress } from "@mui/material/CircularProgress";
export { default as AppBar } from "@mui/material/AppBar";
export { default as Box } from "@mui/material/Box";
export { default as Toolbar } from "@mui/material/Toolbar";
export { default as IconButton } from "@mui/material/IconButton";
export { default as Typography } from "@mui/material/Typography";
export { default as Menu } from "@mui/material/Menu";
export { default as Container } from "@mui/material/Container";
export { default as Avatar } from "@mui/material/Avatar";
export { default as Button } from "@mui/material/Button";
export { default as Tooltip } from "@mui/material/Tooltip";
export { default as MenuItem } from "@mui/material/MenuItem";
export { default as Drawer } from "@mui/material/Drawer";
export { default as TextField } from "@mui/material/TextField";
export { default as Table } from "@mui/material/Table";
export { default as TableHead } from "@mui/material/TableHead";
export { default as TableBody } from "@mui/material/TableBody";
export { default as TableCell } from "@mui/material/TableCell";
export { default as TableContainer } from "@mui/material/TableContainer";
export { default as TableFooter } from "@mui/material/TableFooter";
export { default as TablePagination } from "@mui/material/TablePagination";
export { default as TableRow } from "@mui/material/TableRow";
export { default as Paper } from "@mui/material/Paper";
export { default as useTheme } from "@mui/material/styles/useTheme";
export { default as Modal } from "@mui/material/Modal";
export { default as FormControl } from "@mui/material/FormControl";
export { default as Select } from "@mui/material/Select";
export { default as InputLabel } from "@mui/material/InputLabel";
export { default as Dialog } from "@mui/material/Dialog";
export { default as DialogActions } from "@mui/material/DialogActions";
export { default as DialogContent } from "@mui/material/DialogContent";
export { default as DialogContentText } from "@mui/material/DialogContentText";
export { default as DialogTitle } from "@mui/material/DialogTitle";
export { default as FormControlLabel } from "@mui/material/FormControlLabel";
export { default as Checkbox } from "@mui/material/Checkbox";
export { default as Grid } from "@mui/material/Grid";
export { default as Stack } from "@mui/material/Stack";
export { default as Pagination } from "@mui/material/Pagination";
export { default as AdapterDayjs } from "@mui/lab/AdapterDayjs";
export { default as LocalizationProvider } from "@mui/lab/LocalizationProvider";
export { default as DateTimePicker } from "@mui/lab/DateTimePicker";

export function MaterialProvider(props: { children: ReactNode }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
