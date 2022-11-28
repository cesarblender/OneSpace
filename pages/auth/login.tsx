import * as React from "react";
import Typography from "@mui/material/Typography";
import LoginForm from "../../components/Forms/LoginForm";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
        Iniciar sesión
      </Typography>
      <LoginForm />
    </AuthLayout>
  );
};
