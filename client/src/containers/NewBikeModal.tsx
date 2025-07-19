import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material";
import { BaseModal } from "@components";
import { useFormik } from "formik";
import { Bike } from "@types";
import { useAppSelector, useAppDispatch } from "@store";
import { createBike } from "@slices/bikesSlice";
import { toastError } from "@services/toastsService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewBikeModal({ isOpen, onClose }: Props) {
  const { isLoading } = useAppSelector((state) => state.bikes);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const formik = useFormik<Partial<Bike>>({
    initialValues: {
      model: "",
      color: "",
      location: "",
      pricePerHour: 0,
      isAvailable: true,
    },
    validate: (values) => {
      const errors: {
        model?: string;
        color?: string;
        location?: string;
        pricePerHour?: string;
      } = {};

      if (!values.model) {
        errors.model = "Required";
      }

      if (!values.color) {
        errors.color = "Required";
      }

      if (!values.location) {
        errors.location = "Required";
      }

      if (!values.pricePerHour) {
        errors.pricePerHour = "Required";
      }

      return errors;
    },
    onSubmit: async (bike) => {
      if (!file) {
        toastError("Please select a file");
        return;
      }

      await dispatch(createBike({ bike, file }));
    },
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
      setFile(null);
    }
  }, [isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title="Edit Bike"
      submitBtnText="Save"
      onClose={onClose}
      height="680px"
      onSubmit={formik.handleSubmit}
      isSubmitDisabled={
        !file || isLoading || (formik.touched && !formik.isValid)
      }
    >
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="model"
        name="model"
        label="Model"
        value={formik.values.model}
        onChange={formik.handleChange}
        error={formik.touched.model && Boolean(formik.errors.model)}
        helperText={formik.touched.model && formik.errors.model}
      />
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="color"
        name="color"
        label="Color"
        value={formik.values.color}
        onChange={formik.handleChange}
        error={formik.touched.color && Boolean(formik.errors.color)}
        helperText={formik.touched.color && formik.errors.color}
      />
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="location"
        name="location"
        label="Location"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="pricePerHour"
        name="pricePerHour"
        label="Price/Hour"
        type="number"
        value={formik.values.pricePerHour}
        onChange={formik.handleChange}
        error={
          formik.touched.pricePerHour && Boolean(formik.errors.pricePerHour)
        }
        helperText={formik.touched.pricePerHour && formik.errors.pricePerHour}
      />
      <FormControlLabel
        sx={{ marginTop: "2rem" }}
        control={
          <Checkbox
            id="isAvailable"
            name="isAvailable"
            checked={formik.values.isAvailable}
            onChange={formik.handleChange}
          />
        }
        label="Is Available"
      />
      <Typography sx={{ marginTop: "2rem" }} variant="h5">
        Upload Image{" "}
        <Typography variant="h6" component="span" color="error">
          (required *)
        </Typography>
      </Typography>
      <Box sx={{ marginTop: "1.2rem" }}>
        {file ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>{file.name}</Box>
            <Button onClick={handleRemoveFile} color="warning">
              Remove File
            </Button>
          </Box>
        ) : (
          <Button variant="contained" component="label">
            Upload File
            <input
              accept="image/*"
              type="file"
              onChange={handleFileUpload}
              hidden
            />
          </Button>
        )}
      </Box>
    </BaseModal>
  );
}
