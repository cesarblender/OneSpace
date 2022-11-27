import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import StyledAppBar from "../components/StyledAppbar";

const HomeLayout: React.FC<React.PropsWithChildren & { maxWidth?: "lg" | "md" | "sm" }> = ({
  children,
  maxWidth,
}) => {
  return (
    <React.Fragment>
      <StyledAppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h6">
            OneSpace
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth={maxWidth}>{children}</Container>
    </React.Fragment>
  );
};

export default HomeLayout;
