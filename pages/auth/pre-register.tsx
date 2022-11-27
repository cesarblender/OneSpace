import * as React from "react";
import Typography from "@mui/material/Typography";
import RegisterForm from "../../components/Forms/RegisterForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function PreRegister() {
  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
        Register
      </Typography>
      <RegisterForm />
    </AuthLayout>
  );
};
