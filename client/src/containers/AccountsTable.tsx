import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@store";
import { fetchUsers, setPerPage, deleteUser } from "@slices/usersSlice";
import { Table, DeleteDialogButton } from "@components";
import { EditAccountModal, NewAccountModal } from "@containers";
import { Box, TableCell, Typography, Button } from "@material";
import { DetailedUser } from "@types";

interface AdditionalActionsProps {
  onEditClick: (item: any) => void;
  onDeleteClick: (item: any) => void;
}

const AdditionalActions =
  ({ onEditClick, onDeleteClick }: AdditionalActionsProps) =>
  (item: any) =>
    (
      <>
        <TableCell component="th" scope="row">
          <Button
            disabled={item.role === "MANAGER"}
            component={Link}
            size="small"
            color="info"
            to={`/bookings/${item.id}`}
          >
            Bookings
          </Button>
        </TableCell>
        <TableCell component="th" scope="row">
          <Button
            size="small"
            color="warning"
            onClick={() => onEditClick(item)}
          >
            Edit
          </Button>
        </TableCell>

        <TableCell component="th" scope="row">
          <DeleteDialogButton onSubmit={() => onDeleteClick(item)} />
        </TableCell>
      </>
    );

export default function AccountsTable() {
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DetailedUser | false>(false);
  const dispatch = useAppDispatch();
  const { cachedPages, currentPage, perPage, count } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, perPage }));
  }, [perPage]);

  const columns = [
    "ID",
    "Name",
    "Phone",
    "Email",
    "Role",
    "Bookings",
    "Edit",
    "Delete",
  ];
  const users = cachedPages[currentPage] || [];

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(fetchUsers({ page: newPage, perPage }));
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPerPage(parseInt(event.target.value, 10)));
  };

  const handleEditClick = (item: any) => {
    setSelectedUser(item);
    setIsEditAccountModalOpen(true);
  };

  const handleNewAccountClick = () => {
    setIsNewAccountModalOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    dispatch(deleteUser(item.id));
  };

  const handleNewAccountModalClose = () => {
    setIsNewAccountModalOpen(false);
  };

  const handleEditAccountModalClose = () => {
    setSelectedUser(false);
    setIsEditAccountModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ display: "block" }} variant="h3" component="h3">
          Accounts
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={handleNewAccountClick}
        >
          Create new account
        </Button>
      </Box>
      <Box mt={4}>
        <Table
          rowsPerPage={perPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          count={count}
          page={currentPage}
          columns={columns}
          rows={users}
          additionalActions={AdditionalActions({
            onEditClick: handleEditClick,
            onDeleteClick: handleDeleteClick,
          })}
        />
      </Box>
      {selectedUser && (
        <EditAccountModal
          selectedUser={selectedUser}
          isOpen={isEditAccountModalOpen}
          onClose={handleEditAccountModalClose}
        />
      )}

      <NewAccountModal
        isOpen={isNewAccountModalOpen}
        onClose={handleNewAccountModalClose}
      />
    </>
  );
}
