import * as React from "react";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import HomeLayout from './HomeLayout';
import LandingContainer from '../components/LandingContainer';

export default function AuthLayout({children}: React.PropsWithChildren) {
  return (
    <HomeLayout maxWidth="sm">
      <Toolbar />
      <LandingContainer>
        <Typography variant="h5" component="h1">
          OneSpace
        </Typography>
        {children}
      </LandingContainer>
    </HomeLayout>
  );
};
