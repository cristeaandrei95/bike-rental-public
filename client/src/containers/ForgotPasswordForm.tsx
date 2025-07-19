import { Box, Button, Typography, SxProps, TextField } from "@material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import authService from "@services/authService";

const $buttonWrapper: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
};

const $authNav: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

const $link: SxProps = {
  marginTop: '2rem',
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

export default function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: {
        email?: string;
      } = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
    onSubmit: (values) => {
      authService.forgotPassword(values.email);
    },
  });

  return (
    <Box sx={$root}>
      <Box sx={$card}>
        <Typography variant="h2">Forgot your password?</Typography>

        <form onSubmit={formik.handleSubmit}>
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
          <Box sx={$authNav}>
            <Button sx={$link} variant="text" component={Link} to="/login">
              Login
            </Button>
            <Button
              sx={$link}
              variant="text"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Box>
          <Box mt={4} sx={$buttonWrapper}>
            <Button
              variant="contained"
              type="submit"
              disabled={
                (formik.touched && !formik.isValid) || formik.isSubmitting
              }
            >
              { !formik.isSubmitting ? 'Send new password' : 'Sent' }
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
