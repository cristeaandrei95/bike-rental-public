import { ReactNode, MouseEvent, ChangeEvent } from "react";
import {
  Box,
  Table as MaterialTable,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  Paper,
  useTheme,
} from "@material";
import {
  FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPageIcon,
} from "@icons";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) {
  const theme = useTheme();

  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1 - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1 + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1) + 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface Row {
  [key: string]: string;
}

interface TableProps {
  count: number;
  page: number;
  columns: string[];
  hiddenFields?: string[];
  rowsPerPage: number;
  rows: any[];
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  additionalActions: (item: any) => ReactNode;
}

export default function Table({
  count,
  page,
  columns,
  hiddenFields = [],
  rowsPerPage,
  rows,
  onPageChange,
  onRowsPerPageChange,
  additionalActions,
}: TableProps) {
  return (
    <TableContainer
      sx={{ border: "1px solid", borderColor: "divider" }}
      component={Paper}
      elevation={0}
    >
      <MaterialTable
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={i}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: Row, i) => (
            <TableRow key={i}>
              {Object.entries(row)
                .filter(([key, value]) => !hiddenFields.includes(key))
                .map(([key, value]) => (
                  <TableCell key={key} component="th" scope="row">
                    {typeof value === "string" &&
                    value.includes("https://res.cloudinary.com") ? (
                      <Box width="3rem">
                        <img style={{ width: "100%" }} src={value} alt={key} />
                      </Box>
                    ) : key === "pricePerHour" ? (
                      `${value} $`
                    ) : (
                      String(value)
                    )}
                  </TableCell>
                ))}
              {additionalActions(row)}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[8, 16, 32, 64]}
              colSpan={columns.length}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaterialTable>
    </TableContainer>
  );
}
