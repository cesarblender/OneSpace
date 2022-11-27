import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let dark_theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#cebdff",
      contrastText: "#361f73",
    },
    background: {
      default: "#090909",
    },
    secondary: {
      main: "#CCC2DC",
      contrastText: "#332D41",
    },
  },
  shape: {
    borderRadius: 21,
  },
  components: {
    MuiFab: {
      defaultProps: {
        style: {
          borderRadius: 21,
          position: "fixed",
          bottom: 16,
          right: 16,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
        autoComplete: "off",
        inputProps: {
          style: { WebkitBoxShadow: "0 0 0 30px rgba(0,0,0,0) inset" },
        },
      },
    },
  },
});

dark_theme = responsiveFontSizes(dark_theme);

export { dark_theme };
