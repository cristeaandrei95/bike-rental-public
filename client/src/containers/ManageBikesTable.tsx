import { useState, useEffect, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "@store";
import {
  fetchBikes,
  setPerPage,
  deleteBike,
  resetBikesState,
} from "@slices/bikesSlice";
import { Table, DeleteDialogButton } from "@components";
import { EditBikeModal, NewBikeModal } from "@containers";
import { Box, TableCell, Typography, Button } from "@material";
import { Bike } from "@types";

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

export default function ManageBikesTable() {
  const [isEditBikeModalOpen, setIsEditBikeModalOpen] = useState(false);
  const [isNewBikeModalOpen, setIsNewBikeModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | false>(false);
  const dispatch = useAppDispatch();
  const { cachedPages, currentPage, perPage, count } = useAppSelector(
    (state) => state.bikes
  );

  useEffect(() => {
    dispatch(resetBikesState());
    dispatch(fetchBikes({ page: currentPage, perPage }));
  }, [perPage]);

  const columns = [
    "ID",
    "Model",
    "Color",
    "Location",
    "Image",
    "Is Available",
    "Price / Hour",
    "Rating",
    "Edit",
    "Delete",
  ];
  const cachedBikes = cachedPages[currentPage] || [];
  const bikeWithoutPriceForIntervalField = ({
    priceForInterval,
    ...bike
  }: Bike) => ({
    ...bike,
  });
  const bikes = cachedBikes.map(bikeWithoutPriceForIntervalField);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(fetchBikes({ page: newPage, perPage }));
  };

  const handleRowsPerPageChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPerPage(parseInt(event.target.value, 10)));
  };

  const handleEditClick = (item: Bike) => {
    setSelectedBike(item);
    setIsEditBikeModalOpen(true);
  };

  const handleNewBikeClick = () => {
    setIsNewBikeModalOpen(true);
  };

  const handleDeleteClick = (item: Bike) => {
    dispatch(deleteBike(item.id));
  };

  const handleNewBikeModalClose = () => {
    setIsNewBikeModalOpen(false);
  };

  const handleEditBikeModalClose = () => {
    setSelectedBike(false);
    setIsEditBikeModalOpen(false);
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
          Manage Bikes
        </Typography>
        <Button variant="contained" size="small" onClick={handleNewBikeClick}>
          Create New Bike
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
          rows={bikes}
          additionalActions={AdditionalActions({
            onEditClick: handleEditClick,
            onDeleteClick: handleDeleteClick,
          })}
        />
      </Box>
      {selectedBike && (
        <EditBikeModal
          selectedBike={selectedBike}
          isOpen={isEditBikeModalOpen}
          onClose={handleEditBikeModalClose}
        />
      )}

      <NewBikeModal
        isOpen={isNewBikeModalOpen}
        onClose={handleNewBikeModalClose}
      />
    </>
  );
}
