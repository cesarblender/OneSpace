import { styled, alpha } from "@mui/material/styles";
import AppBar, { AppBarProps } from "@mui/material/AppBar";

const StyledAppBar = styled(AppBar)<AppBarProps>(({theme}) => ({
  backdropFilter: "blur(8px)",
  background: `${alpha(theme.palette.background.paper, 0.3)}`,
}));

export default StyledAppBar;
