import { Box, Button, Typography, SxProps, TextField } from "@material";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@store";
import { resetPassword } from "@slices/authSlice";

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

export default function ResetPasswordForm() {
  const { isSubmitting } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: search.get("email") || "",
      tempPassword: search.get("tempPassword") || "",
      password: "",
    },
    validate: (values) => {
      const errors: {
        email?: string;
        tempPassword?: string;
        password?: string;
      } = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.tempPassword) {
        errors.tempPassword = "Required";
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
    onSubmit: (resetCredentials) => {
      dispatch(resetPassword({ resetCredentials, navigate }));
    },
  });

  return (
    <Box sx={$root}>
      <Box sx={$card}>
        <Typography variant="h2">Reset password</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ marginTop: "2rem" }}
            fullWidth
            variant="filled"
            id="email"
            name="email"
            label="Email"
            disabled
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ marginTop: "2rem" }}
            fullWidth
            variant="filled"
            id="tempPassword"
            name="tempPassword"
            label="Temporary Password"
            type="password"
            disabled
            value={formik.values.tempPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.tempPassword && Boolean(formik.errors.tempPassword)
            }
            helperText={
              formik.touched.tempPassword && formik.errors.tempPassword
            }
          />
          <TextField
            sx={{ marginTop: "2rem" }}
            fullWidth
            variant="filled"
            id="password"
            name="password"
            label="New password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Box sx={$authNav}>
            <Button sx={$link} variant="text" component={Link} to="/register">
              Register
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
              Reset password
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
