import { ReactNode } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  SxProps,
  Modal as MaterialModal,
} from "@material";
import { CloseIcon } from "@icons";

const $modalWrapper = (height: any): SxProps => ({
  backgroundColor: "background.paper",
  width: { xs: "100%", sm: "500px" },
  height: { xs: "100%", sm: height },
  borderRadius: { xs: "0", sm: "8px" },
  position: "absolute",
  transform: "translate(-50%,-50%)",
  top: "50%",
  left: "50%",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
});

const $header: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const $title: SxProps = {
  display: "block",
};

const $content: SxProps = {
  height: "100%",
};

const $footer: SxProps = {
  display: "flex",
  justifyContent: "center",
};

interface Props {
  isOpen: boolean;
  children?: ReactNode;
  title?: String;
  height?: String;
  submitBtnText?: String;
  onClose: () => void;
  onSubmit?: () => void;
  isSubmitDisabled?: boolean;
}

export default function BaseModal({
  isOpen = false,
  title,
  height = "480px",
  submitBtnText = "Submit",
  children,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
}: Props) {
  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit();
    }
    onClose();
  };
  return (
    <MaterialModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={$modalWrapper(height)}>
        <Box sx={$header}>
          <Typography sx={$title} variant="h4" component="h4">
            {title}
          </Typography>

          <IconButton
            aria-label="modal-icon-close"
            aria-controls="modal"
            aria-haspopup="true"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={$content}>{children}</Box>
        <Box sx={$footer}>
          <Button
            variant="contained"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            {submitBtnText}
          </Button>
        </Box>
      </Box>
    </MaterialModal>
  );
}
