import { Box, Button, Typography, SxProps, TextField } from "@material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";
import { register } from "@slices/authSlice";

const $buttonWrapper: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
};

const $authNav: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

const $link: SxProps = {
  marginTop: "2rem",
  textDecoration: "underline",
  fontSize: "1.4rem",
  textTransform: "none",
};

const $root: SxProps = {
  width: { xs: "100%", md: "50%" },
  display: "flex",
  justifyContent: "center",
};

const $card: SxProps = {
  maxWidth: "400px",
  padding: "4rem 3rem",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "3rem",
  backgroundColor: "background.paper",
};

export default function RegisterForm() {
  const { isSubmitting } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: {
        name?: string;
        phone?: string;
        email?: string;
        password?: string;
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

      if (!values.password) {
        errors.password = "Required";
      } else if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
          values.password
        )
      ) {
        errors.password =
          "Password must be at least 8 characters long and contain at least one number, one letter and one symbol.";
      }
      return errors;
    },
    onSubmit: async (userData) => {
      dispatch(register({ userData, navigate }));
    },
  });

  return (
    <Box sx={$root}>
      <Box sx={$card}>
        <Typography variant="h2">Create account</Typography>

        <form onSubmit={formik.handleSubmit}>
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
          <TextField
            sx={{ marginTop: "2rem" }}
            fullWidth
            variant="filled"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box sx={$authNav}>
            <Button sx={$link} variant="text" component={Link} to="/login">
              Login
            </Button>
            <Button
              sx={$link}
              variant="text"
              component={Link}
              to="/forgot-password"
            >
              Forgot password
            </Button>
          </Box>
          <Box mt={4} sx={$buttonWrapper}>
            <Button
              variant="contained"
              type="submit"
              disabled={(formik.touched && !formik.isValid) || isSubmitting}
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
