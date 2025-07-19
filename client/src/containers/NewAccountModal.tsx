import { useEffect } from "react";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material";
import { BaseModal } from "@components";
import { useFormik } from "formik";
import { DetailedUser, Role } from "@types";
import { useAppSelector, useAppDispatch } from "@store";
import { createUser } from "@slices/usersSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewAccountModal({ isOpen, onClose }: Props) {
  const { isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const formik = useFormik<Omit<DetailedUser, "id">>({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      role: Role.USER,
    },
    validate: (values) => {
      const errors: {
        name?: string;
        phone?: string;
        email?: string;
      } = {};

      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.phone) {
        errors.phone = "Required";
      } else if (
        !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i.test(
          values.phone
        )
      ) {
        errors.phone = "Invalid phone number";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: async (userData) => {
      dispatch(createUser(userData));
    },
  });

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
    }
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      title="Create New Account"
      submitBtnText="Save"
      onClose={onClose}
      onSubmit={formik.handleSubmit}
      isSubmitDisabled={isLoading || (formik.touched && !formik.isValid)}
    >
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="phone"
        name="phone"
        label="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <TextField
        sx={{ marginTop: "2rem" }}
        fullWidth
        variant="filled"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <FormControl variant="filled" sx={{ marginTop: "2rem" }}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          label="Role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <MenuItem value={Role.USER}>{Role.USER}</MenuItem>
          <MenuItem value={Role.MANAGER}>{Role.MANAGER}</MenuItem>
        </Select>
      </FormControl>
    </BaseModal>
  );
}
