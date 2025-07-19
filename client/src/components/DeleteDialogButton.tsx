import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material";

interface Props {
  onSubmit: () => void;
}

export default function DeleteDialogButton({ onSubmit }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  return (
    <div>
      <Button size="small" color="error" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-entry"
        aria-describedby="delete-entry"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this entry?
        </DialogTitle>
        <DialogContent>
          <DialogContentText  sx={{fontSize: "1.4rem"}} color="error" id="delete-entry-description">
            This operation is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={handleSubmit} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
