import { TextField, FormControlLabel, Checkbox } from "@material";
import { BaseModal } from "@components";
import { useFormik } from "formik";
import { Bike } from "@types";
import { useAppSelector, useAppDispatch } from "@store";
import { updateBike } from "@slices/bikesSlice";

interface Props {
  selectedBike: Bike;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditBikeModal({
  selectedBike,
  isOpen,
  onClose,
}: Props) {
  const { isLoading } = useAppSelector((state) => state.bikes);
  const dispatch = useAppDispatch();
  const formik = useFormik<Bike>({
    initialValues: {
      ...selectedBike,
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
    onSubmit: async (bikeData) => {
      dispatch(updateBike(bikeData));
    },
  });

  return (
    <BaseModal
      isOpen={isOpen}
      title="Edit Bike"
      submitBtnText="Save"
      onClose={onClose}
      height="520px"
      onSubmit={formik.handleSubmit}
      isSubmitDisabled={isLoading || (formik.touched && !formik.isValid)}
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
    </BaseModal>
  );
}
