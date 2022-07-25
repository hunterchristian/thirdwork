import { createTheme, PaletteColorOptions } from "@mui/material/styles";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      light: "#6366f1",
      main: "#6366f1",
      dark: "#6366f1",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          borderRadius: "32px",
          padding: "6px 20px",
        },
      },
    },
  },
});

export default theme;
