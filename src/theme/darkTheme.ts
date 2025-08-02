// theme.ts
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0F1014",
      paper: "#1F1F1F",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A3A3A3",
    },
  },
  shape: {
    borderRadius: 8, // default radius for components like Card
  },
  // You can customize other theme properties (typography, shadows, etc.)
});

export default darkTheme;
