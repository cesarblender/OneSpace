import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

const LandingContainer = styled(Box)<BoxProps>(() => ({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export default LandingContainer;
