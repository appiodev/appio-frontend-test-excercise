import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme();

muiTheme.typography.h1 = {
  ...muiTheme.typography.h1,
  fontSize: "2rem",
  fontWeight: 400,
};

muiTheme.typography.h2 = {
  ...muiTheme.typography.h2,
  fontSize: "2rem",
};

muiTheme.typography.h3 = {
  ...muiTheme.typography.h2,
  fontSize: "1.8rem",
};

muiTheme.palette.primary.main = "#0A55D7";
muiTheme.typography.fontFamily = "Inter";
muiTheme.typography.button.fontFamily = "Space Grotesk";
muiTheme.typography.h1.fontFamily = "Space Grotesk";
muiTheme.typography.h2.fontFamily = "Space Grotesk";
muiTheme.typography.h3.fontFamily = "Space Grotesk";
