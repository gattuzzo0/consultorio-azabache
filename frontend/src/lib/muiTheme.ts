import { createTheme } from "@mui/material/styles";

export const azabacheTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#10b981", dark: "#059669", contrastText: "#ffffff" },
    secondary: { main: "#0b1220", contrastText: "#ffffff" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#475569" },
    divider: "#e5e7eb",
    success: { main: "#10b981" },
    error: { main: "#ef4444" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.025em" },
    h2: { fontWeight: 800, letterSpacing: "-0.025em" },
    h3: { fontWeight: 700, letterSpacing: "-0.02em" },
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontWeight: 700, letterSpacing: "-0.015em" },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 18,
          paddingBlock: 9,
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
