import { createTheme } from "@material";

// https://material-ui.com/customization/theming/#api
export default createTheme({
  palette: {
    action: {
      active: "#222c39",
      hover: "#eff0f1",
    },
    primary: {
      main: "#4675F7",
      dark: "#0048a1",
      light: "#6ca1ff",
    },
    secondary: {
      main: "#4b5563",
      light: "#778191",
      dark: "#222c39",
    },
    background: {
      paper: "#FFFFFF",
      default: "#f9fafb",
    },
    text: {
      primary: "#373646",
      secondary: "#8F9BB3",
    },
    divider: "#E2E2E2",
  },
  components: {
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 4,
  typography: {
    button: {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    overline: {
      fontWeight: 600,
    },
    h1: {
      fontSize: "5.8rem",
      fontWeight: 600,
      lineHeight: "5.6rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "4.8rem",
      lineHeight: "5.6rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.4rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.8rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
    },
    body1: {
      fontSize: "1.8rem",
      lineHeight: "1.8rem",
    },
    subtitle2: {
      fontSize: "1.4rem",
      lineHeight: "1.6rem",
      fontWeight: 400,
    },
  },
});
